"use client"

import { useRouter } from "next/navigation";
import { useTargetUser } from "../hooks/useTargetUser";
import RightChevron from "../ui/icons/RightChevron";

import { useSession } from "next-auth/react";
import { useDatabase } from "../hooks/useDatabase";
import { useEffect, useState } from "react";

const User = ({ data, status }: any) => {
  const [_user, setTargetUser] = useTargetUser();
  const router = useRouter();

  const handleClick = async () => {
    console.log("redirecting");
    setTargetUser(data.user)
    router.push("/cave")
  };

  if (!data) return <></>

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
              className={`inline-block w-2 h-2 rounded-full ${status === "authenticated" ? "bg-green-400" : "bg-gray-300"
                } animate-pulse mr-1`}
            ></span>
            {status === "authenticated" ? "Online" : "Offline"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export const HubClient = () => {
  const { data, status } = useSession();
  const { users } = useDatabase();
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    console.log(users)

  }, [users])

  if (!isLoaded) return <></>
  if (status !== "authenticated") return <></>

  return (
    <div className="flex flex-col lg:mt-[1.2rem] space-y-[12px] min-w-full">
      {users.map(() => (
        <User data={data} status={status} />
      ))}
    </div>
  );
};
