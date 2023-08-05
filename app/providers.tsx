"use client";

import React from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useState, createContext, useEffect, useRef } from "react";
import {
    child,
    get,
    getDatabase,
    onChildAdded,
    onChildChanged,
    onDisconnect,
    onValue,
    push,
    ref,
    serverTimestamp,
    set,
    update,
} from "firebase/database";
import { getApp, getApps, initializeApp } from "firebase/app";

const ID_SEPARATOR = "----";

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    appId: process.env.FIREBASE_APP_ID,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    databaseURL:
        "https://hackathon-smashers-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = getApps.length === 0 ? initializeApp(config) : getApp();
const db = getDatabase(app);

export const TargetUserContext = createContext([{}, () => { }]);
export const TargetUserProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [targetUser, setTargetUser] = useState({});

    return (
        <TargetUserContext.Provider value={[targetUser, setTargetUser]}>
            {children}
        </TargetUserContext.Provider>
    );
};

export const DatabaseContext = createContext({});
export const DatabaseProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [_users, setUsers] = useState({});
    const [_msgs, setMsgs] = useState({});
    const { data, status } = useSession();
    let chatRoomRef = useRef<Array<string>>([]);
    let chatListenerSubscribed = useRef(false);

    // TODO: Remove after debug
    useEffect(() => {
        console.log("==== USERS ====");
        console.log(_users);
        console.log("==== ======== ====");
        console.log("==== MESSAGES ====");
        console.log(_msgs);
        console.log("==== ======== ====");
        console.log("==== CHAT ROOMS ====");
        console.log(chatRoomRef);
        console.log("==== ======== ====");
    }, [_users, _msgs, chatRoomRef]);

    // Onload
    useEffect(() => {
        if (status == "authenticated") {
            // logged in
            const presenceRef = ref(db, ".info/connected");

            const user_id = (data?.user as any)?.userId
            console.log(data)

            const currentUserData = data?.user

            // Set the user's presence to 'true' when they sign in
            if (currentUserData) {

                _createUserIfNotExists((currentUserData as any).userId, currentUserData.name ?? "Anonymous", currentUserData.image ?? "https://i.pinimg.com/222x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg")

                onValue(presenceRef, (snap) => {
                    if (snap.val() === true) {
                        const connectionsRef = ref(db, `users/${user_id}/connections`); // If this object isn't empty - we are online.
                        const lastOnlineRef = ref(db, `users/${user_id}/lastOnline`); // Updated on disconnect (Not on connect - look to connections ^^^ for online status)

                        // Add our device connection to connections list
                        const con = push(connectionsRef);
                        // When I disconnect, remove this device and update the last time I was seen online
                        onDisconnect(con).remove();
                        onDisconnect(lastOnlineRef).set(serverTimestamp());

                        // Add this device to my connections list
                        set(con, true);
                    }
                });
            }

            // Get copy of all users
            const usersRef = ref(db, "users/");
            onValue(usersRef, (snapshot) => {
                setUsers(snapshot.val() ?? {});
            });

            // Get a copy of all rooms
            const chatRoomsRef = ref(db, "chatRooms/");
            onValue(chatRoomsRef, (snapshot) => {
                let chatRoomData = snapshot.val();

                if (chatRoomData) {
                    // Only add a chat room to our watch list if it pertains to the current user.
                    for (const [roomId, participants] of Object.entries(chatRoomData)) {
                        if (Object.values(participants as any).includes(user_id)) {
                            chatRoomRef.current.push(roomId);
                        }
                    }
                }
            });
        } else if (status == "unauthenticated") {
            //not logged in
        } else {
            //loading
        }
    }, [status]);

    useEffect(() => {
        // We need the chat room processing to be done before we start listening for chats.
        // We also only need this set once. Hence the ref

        // Get copy of all messages pertaining to the current user.
        // TODO: Until we implement Firebase Auth integration into our custom auth loop, clients will have access to ALL messages!!
        // When implemented, we can set .read/.write rules with https://firebase.google.com/docs/database/security/rules-conditions
        const _onChatChangeHandler = (data: any) => {
            let roomId = data.key;
            if (roomId && chatRoomRef.current.includes(roomId)) {
                setMsgs((prevMsgs) => {
                    let updated = { ...prevMsgs };
                    (updated as any)[roomId] = data.val();

                    return updated || {};
                });
            }
        };

        if (!chatListenerSubscribed.current) {
            const chatRef = ref(db, "chats/");
            onChildAdded(chatRef, _onChatChangeHandler);
            onChildChanged(chatRef, _onChatChangeHandler);
            chatListenerSubscribed.current = true;
        }
    }, [chatRoomRef]);

    // -- PROVIDER HELPERS --
    const _getChatRoomId = (uid1: string, uid2: string) => {
        return [uid1, uid2].sort().join(ID_SEPARATOR);
    };

    // -- PROVIDER FUNCTIONS --

    /**
     * A helper function that checks if a given UID online.
     * @param userId
     * @returns boolean: True if the user is online, false otherwise.
     */
    const _isUserOnline = (userId: string) => {
        return (
            userId in _users &&
            "connections" in (_users as any)[userId] &&
            (_users as any)[userId].keys().length > 0
        );
    };

    /**
     * Checks if a user is already registered within RTDB. (Separate from Firestore!)
     *
     * @param uid
     */
    const _userExists = (uid: string) => {
        return uid in _users;
    };

    /**
     * Registers the given UID on RTDB if it doesn't exist.
     * Trusts the validity of the given ID.
     *
     * @param uid
     */
    const _createUserIfNotExists = (uid: string, name: string, imageUrl: string) => {
        if (!_userExists(uid)) {
            console.log(`CREATING ${uid} with ${name} and ${imageUrl}`)
            set(ref(db, `users/${uid}`), {
                name: name,
                imageUrl: imageUrl,
                userChats: {},
                connections: {},
                lastOnline: serverTimestamp(),
            });
        }
    };

    /**
     * Creates a chatroom between two users if it is non-existant.
     *
     * @param roomId Chatroom ID to create if non-existant
     */
    const _createChatIfNotExists = (uid1: string, uid2: string) => {
        let roomId = _getChatRoomId(uid1, uid2);
        get(child(ref(db), `chatRooms/${roomId}`))
            .then((snapshot) => {
                if (!snapshot.exists()) {
                    set(ref(db, `chatRooms/${roomId}/`), {
                        user1: uid1,
                        user2: uid2,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    /**
     * Sends a message from a sender to a recipient.
     * Registers any user IDs to RTDB and trusts given IDs.
     *
     * Chat rooms are created if non-existant. Chat ID between any two users is as follows:
     * uid1<ID_SEPARATOR>uid2 where uid1 comes before uid2 lexicographcially.
     * E.g. uid1----uid2
     *
     * @param senderId
     * @param recipientId
     * @param message
     */
    const _sendMessage = (senderId: string, recipientId: string, message: string) => {
        if (senderId == recipientId) {
            throw new Error("A user cannot message one's self!")
        }
        // Assume IDs are valid. Ensure users are registered.
        if (!(_userExists(senderId) && _userExists(recipientId))) {
            throw new Error("One or more users are not registered!")
        }
        _createChatIfNotExists(senderId, recipientId)

        const messagesRef = ref(db, `chats/${_getChatRoomId(senderId, recipientId)}/messages/`)
        const newMessageRef = push(messagesRef)

        set(newMessageRef, {
            timestamp: serverTimestamp(),
            message: message
        });
    };

    return (
        <DatabaseContext.Provider
            value={{
                users: _users,
                messages: _msgs,
                sendMessage: _sendMessage,
                isUserOnline: _isUserOnline,
            }}
        >
            {children}
        </DatabaseContext.Provider>
    );
};

export default function Providers({ children }: any) {
    return (
        <>
            <SessionProvider>
                <DatabaseProvider>
                    <TargetUserProvider>{children}</TargetUserProvider>
                </DatabaseProvider>
            </SessionProvider>
        </>
    );
}
