"use client"
import styles from "./header.module.css"
import { signIn, signOut } from "next-auth/react"

export function SignOut() {
  return (
    <div className={"w-[10rem] py-auto cursor-pointer bg-slate-800 rounded-md h-[2.5rem] text-white font-bold uppercase flex"} onClick={() => signOut()}>
      <p className="mx-auto my-auto">Sign out</p>
    </div>
  )
}

export function SignIn() {
  return (
    <div className={"w-[10rem] py-auto mt-[2.5rem] cursor-pointer bg-slate-800 rounded-md h-[2.5rem] text-white font-bold uppercase flex"} onClick={() => signIn("github")}>
      <p className="mx-auto my-auto">Sign in</p>
    </div>
  )
}
