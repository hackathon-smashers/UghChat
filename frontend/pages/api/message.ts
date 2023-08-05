import { getApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

const secret = process.env.NEXTAUTH_SECRET
const app = getApp()
const db = getDatabase(app)

interface ChatMessage {
    chatID:{
        messageID: {
            message: string;
            messageDate: string;
            messageTime: string;
            sentBy: string;
        };
    }
}

interface SendMessageFormProps {
    chatId: string;
    userId: string;
}

export default async function handler(req: any, res: any) {

    const someRef = ref(db, 'message/');
    onValue(someRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        return res.status(200).json({message: JSON.stringify(data)})
    });


    return someRef;
}