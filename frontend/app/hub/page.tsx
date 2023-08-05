"use client"

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import RightChevron from "../../ui/icons/RightChevron";

const User = ({ data, status }: any) => {
    return (
        <div className="w-96 bg-white h-[6.4rem] border-2 border-slate-200 rounded-md flex flex-row">
            <div className="flex flex-row m-3">

                <ul>
                    <div
                        className="w-16 h-16 bg-cover bg-center rounded-full"
                        style={{
                            backgroundImage: `url('${data.user?.image}')`,
                        }}>
                    </div>
                </ul>

                <ul className="m-3 ml-[1.5rem] my-[0rem] my-auto overflow-x-scroll">
                    <li className="text-md font-bold">{data.user!.name}</li>
                    <li className="italic">of the dank meme tribe</li>
                    <li>
                        <span
                            className={`inline-block w-2 h-2 rounded-full ${status === "authenticated" ? "bg-green-400" : "bg-gray-300"
                                } animate-pulse mr-1`}
                        ></span>
                        {status === "authenticated" ? "Online" : "Offline"}
                    </li>
                </ul>
                <div>
                    <RightChevron />
                </div>
            </div>
        </div>

    )
}

export default function IndexPage() {
    const { data, status } = useSession();
    if (status !== "authenticated") return <></>

    return (
        <div className="min-h-screen bg-white flex flex-col space-y-[0.8rem] justify-center items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(() => (
                <User data={data} status={status} />
            ))}
        </div>
    );
}
