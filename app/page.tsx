"use client"

import { useSession } from "next-auth/react";
import { SignIn } from "./actions";
import Image from "next/image"
import { redirect } from "next/navigation";

export default function IndexPage() {
    const { status } = useSession()

    if (status == "authenticated") redirect("/hub")

    return (
        <div className="flex flex-col w-full h-screen min-h-screen">
            <div className="flex w-full h-[5rem] pt-4">
                {/* Header */}
                <div className="flex ml-[1.2rem] h-[2rem] w-[2rem] bg-slate-400 rounded-md rounded-tl-none"></div>
                <p className="flex ml-[.6rem] text-2xl font-bold text-slate-900">UghChat</p>


                <ul className="ml-auto flex flex-row mr-[1.2rem]">
                    <li className="mr-[2rem] ">
                        <a target="_blank" className="flex cursor-pointer flex-row font-medium text-[#65686C] hover:font-bold hover:text-black" href="https://github.com/00dsql">Don</a>
                    </li>
                    <li className="mr-[2rem] w-[4.43rem] flex">
                        <a className="flex cursor-pointer flex-row font-medium text-[#65686C] hover:font-bold hover:text-black" href="https://github.com/derogative404">Sebastian</a>
                    </li>
                    <li className="mr-[2rem] w-[2.7rem]">
                        <a className="flex cursor-pointer flex-row font-medium text-[#65686C] hover:font-bold hover:text-black" href="https://github.com/LetMeP1ay">Vadim</a>
                    </li>
                    <li className="mr-[2rem] w-[2rem]">
                        <a className="flex cursor-pointer flex-row font-medium text-[#65686C] hover:font-bold hover:text-black" href="https://github.com/supesu">Kian</a>
                    </li>
                    <li className="mr-[1.1rem] w-[1.6rem]">
                        <a target="_blank" className="flex cursor-pointer flex-row font-medium text-[#65686C] hover:font-bold hover:text-black" href="#">Jin</a>
                    </li>
                </ul>

            </div>
            <div className="flex h-full w-full">
                <div className="flex flex-col w-1/2 h-full">
                    {/* Lefthand side */}

                    <div className="flex flex-col w-[40rem] m-auto ml-[5rem] mt-[15rem]">
                        <p className="text-5xl font-bold">Say it with a grunt!</p>
                        <p className="text-xl font-light w-[25rem] text-slate-500 mt-3">Text to Grunt: Because sometimes words are just too mainstream.</p>
                        <SignIn />
                    </div>
                </div>
                <div className="flex w-1/2 h-full">
                    {/* Righthand side */}

                    <Image
                        className="mx-auto mt-[1.2rem] aspect-[1.07/1] hide-bg bg-no-repeat p-8 pb-12 w-[41rem] h-[40rem]"
                        height={400}
                        width={400}
                        priority
                        style={{ backgroundImage: 'url(/blob.svg)' }}
                        src="/HeroImage.png"
                        alt="Hero image"
                    />

                </div>
            </div>
        </div>
    )


    // return (
    //   <div className="w-full min-h-screen bg-[#f2f2f3] h-screen">
    //     <p className="flex text-4xl text-slate-900 font-bold mx-auto justify-center pt-[10rem]">UghChat</p>
    //     <img src="/hero.jpg" alt="" className="hide-bg mx-auto mt-4 w-[14rem] h-[14rem]" />
    //     <div className="flex justify-center mt-[1.5rem]">
    //       <SignIn/>
    //     </div>
    //   </div>
    // )
}
