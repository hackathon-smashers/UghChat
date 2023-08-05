"use client"

import { useSession } from "next-auth/react";
import { SignIn, SignOut } from "./actions";
import { useEffect } from "react"
import { useDatabase } from "../hooks/useDatabase"

export default function IndexPage() {
  const { status } = useSession()
  const [user, setUser] = useDatabase() as any;


  useEffect(() => {
    console.log(status)

    console.log(user)
    setUser(user + "a")
  }, [status])

  return (
    <div className="w-full min-h-screen bg-[#f2f2f3] h-screen">
      <p className="flex text-4xl text-slate-900 font-bold mx-auto justify-center pt-[10rem]">UghChat</p>
      <img src="https://cdn-icons-png.flaticon.com/512/773/773328.png" alt="" className="mx-auto mt-4 w-[10rem]" />
      <div className="flex justify-center mt-[2rem]">
        {status === "authenticated" ? <SignOut /> : <SignIn />}
      </div>
    </div>
  )
}
