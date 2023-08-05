"use client";

import { useSession } from "next-auth/react";
import RightChevron from "../../../ui/icons/RightChevron";
import { SignOut } from "../../actions";
import { redirect } from "next/navigation";

const User = ({ data, status }: any) => {
  const handleClick = () => {
    console.log("redirecting")
    redirect("/cave")
  };

  return (
    <div
      onClick={() => handleClick()}
      className="bg-white lg:h-[5.4rem] border-2 border-slate-300 cursor-pointer rounded-md flex flex-row lg:w-96 overflow-x-hidden"
    >
      <div className="flex flex-row m-2">
        <ul>
          <div
            className="w-16 h-16 bg-cover bg-center rounded-full"
            style={{
              backgroundImage: `url('${data.user?.image}')`,
            }}
          ></div>
        </ul>

        <ul className="my-auto">
          <li className="ml-8 w-[20px] rounded-md h-[20px] float-right">
            <RightChevron />
          </li>
          <li className="text-ellipsis overflow-hidden w-[10.5em] ml-3 text-md font-bold float-left">
            {data.user!.name}
          </li>
          <li className="float-right">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                status === "authenticated" ? "bg-green-400" : "bg-gray-300"
              } animate-pulse mr-1`}
            ></span>
            {status === "authenticated" ? "Online" : "Offline"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default function IndexPage() {
  const { data, status } = useSession();

  if (status !== "authenticated") return <></>;

  return (
    <div className="min-h-full min-w-full bg-white flex flex-col space-y-2 lg:space-y-[0.8rem] lg:justify-center lg:items-center overflow-visible">
      <div className="flex ml-auto mr-auto flex-col">
        <div className="flex flex-row">
          <h1 className="font-bold text-2xl mr-auto lg:text-3xl lg:mt-[2.5rem] text-slate-900">
            UghChat
          </h1>
          <SignOut />
        </div>

        <div className="flex flex-col lg:mt-[1.2rem] space-y-[12px] min-w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(() => (
            <User data={data} status={status} />
          ))}
        </div>
      </div>
    </div>
  );
}
