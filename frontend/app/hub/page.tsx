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
        <div className="w-full min-h-screen bg-black h-screen flex justify-center items-center">
            <div className="w-96 bg-white h-screen">
                <ul>
                    <div className="justify-center">
                    <li>hello</li>
                    <li>yo</li>
                    </div>
                </ul>
            </div>
        </div>
    )
}
