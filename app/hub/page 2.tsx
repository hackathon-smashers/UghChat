"use client"

import { getSession } from "next-auth/react";
import { useEffect } from "react";

interface User {
    name: string;
    pfp: string;
    status: boolean;
}

export default function IndexPage() {
    const session = getSession();    

    useEffect(() => {
        console.log(session)
    }, [session])

    return (
        <div className="w-full min-h-screen bg-black h-screen">
            <div className="w-10rem bg-white h-screen">
                <h1 className="color-white">hello</h1>
            </div>
        </div>
    )
}
