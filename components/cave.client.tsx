"use client";

import { useRouter } from "next/navigation";
import { useTargetUser } from "../hooks/useTargetUser";
import { useEffect, useState } from "react";
import { useDatabase } from "../hooks/useDatabase";
import { useSession } from "next-auth/react";
import RightChevron from "../ui/icons/RightChevron";

const MyTextBubble = ({ message }: any) => {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div>
        <div className="bg-slate-800 text-white p-3 rounded-l-lg rounded-br-lg">
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">
          2 min ago
        </span>
      </div>
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    </div>
  )
}

const TheirTextBubble = ({ message }: any) => {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
      <div>
        <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
          <p className="text-sm">
            {message}
          </p>
        </div>
        <span className="text-xs text-gray-500 leading-none">
          2 min ago
        </span>
      </div>
    </div>
  )
}


export function CaveClient() {
  const [user, setUser] = useTargetUser();
  const { data } = useSession() as any;
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { sendMessage, messages } = useDatabase();
  const [status] = useState(Object.keys(user).includes("connections"));
  const getId = (id1: number, id2: number) => {
    if (id1 > id2) return `${id2}----${id1}`
    return `${id1}----${id2}`
  }

  const handleSubmit = (msg?: string) => {
    if (msg) {
      if (msg === "") return;
      sendMessage(data.userId, user.userId, msg)
      var objDiv = document.getElementById("container") as any;
      objDiv.scrollTop = 9999;

      const msgbox = document.getElementById("message-box") as any
      msgbox.value = ""
      setMessage("")
    } else {
      if (message === "") return;


      const msgbox = document.getElementById("message-box") as any
      msgbox.value = ""
      sendMessage(data.userId, user.userId, message)
      setMessage("")
      var objDiv = document.getElementById("container") as any;
      objDiv.scrollTop = 9999;
    }
  }

  if (typeof window === "undefined") return <>No window</>
  if (!user.userId) {
    router.push("/hub")

    return <></>
  }

  if (!data) return <></>

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex flex-col flex-grow w-full mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Top section */}
        <div className="flex w-full h-[6.5rem] border-b-2 bg-slate-100 border-slate-300">
          <div
            className="w-16 h-16 bg-cover bg-center rounded-full my-auto ml-[1.2rem]"
            style={{
              backgroundImage: `url('${user?.imageUrl}')`,
            }}
          />

          <div className="flex ml-[1rem] flex-col">
            <p className="mt-auto text-2xl font-bold">{user.name}</p>
            <div className="float-right text-sm mt-[0.2rem] mb-auto">
              <span
                className={`inline-block w-2 h-2 rounded-full ${status ? "bg-green-400" : "bg-gray-300"
                  } animate-pulse mr-1`}
              ></span>
              {status ? "Online" : "Offline"}
            </div>
          </div>
          <div
            onClick={() => router.push("/hub")}
            className="flex ml-auto rotate-180 text-white h-[3.5rem] w-[3.5rem] cursor-pointer bg-slate-700 my-auto mr-[1.1rem] rounded"
          >
            <RightChevron />
          </div>
        </div>

        {/* Text Container */}
        <div id="container" className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          {messages[getId(user.userId, data.userId)] && Object.keys(messages[getId(user.userId, data.userId)]["messages"]).map((key: any) => {
            const message = messages[getId(user.userId, data.userId)]["messages"][key];

            if (message.sender == data.userId) return <MyTextBubble message={message.message as any} />
            if (message.sender) return <TheirTextBubble message={message.message as any} />

            return <></>
          })}
        </div>

        {/* Input */}
        <div className="bg-gray-300 flex flex-row p-4">
          <input
            className="flex items-center h-10 w-full rounded px-3 text-sm"
            type="text"
            onBlur={(e) => {
              e.preventDefault()
              setMessage(e.target.value)
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                const badSolution = document.getElementById("message-box") as any

                handleSubmit(badSolution.value)
              }

            }}
            id="message-box"
            placeholder="Type your message…"
          />
          <div onClick={() => handleSubmit()} className="text-white flex h-[2.4rem] w-[2.7rem] m-auto ml-3 rounded cursor-pointer bg-slate-900">
            <RightChevron />
          </div>
        </div>
      </div>
    </div>
  );
}
