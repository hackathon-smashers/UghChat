"use client"

import React from 'react'
import { SessionProvider } from "next-auth/react"
import { useState, createContext, useEffect, useRef, use } from 'react';


export const DatabaseContext = createContext({});
export const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
    // logic
    const [user, setUser] = useState({ name: "test" })

    const data = useRef(false)
    useEffect(() => {
        if (data.current == true) return;
        data.current = true;


    }, [])

    return (
        <DatabaseContext.Provider value={[user, setUser]}>
            {children}
        </DatabaseContext.Provider>
    )

}

export default function Providers({ children }: any) {
    return (
        <>
            <SessionProvider>
                <DatabaseProvider>
                    {children}
                </DatabaseProvider>
            </SessionProvider>
        </>
    )
}