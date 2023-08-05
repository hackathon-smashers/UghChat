"use client";

import { useRouter } from "next/navigation";
import { useTargetUser } from "../hooks/useTargetUser";
import { useEffect } from "react";

export function CaveClient() {
  const [user, setUser] = useTargetUser();
  const router = useRouter();

  if (typeof window === "undefined") return <></>
  if (!user ) return <></>

  useEffect(() => {
    console.log("test", user)
  }, [user])

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex flex-col flex-grow w-full my-3 mx-auto max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Top section */}
        <div className="flex w-full h-[6.5rem] border-b-2 bg-slate-100 border-slate-300">
          <div
            className="w-16 h-16 bg-cover bg-center rounded-full my-auto ml-[1.2rem]"
            style={{
              backgroundImage: `url('${user?.image}')`,
            }}
          />

          <div className="flex ml-[1rem] flex-col">
            <p className="mt-auto text-2xl font-bold">{user.name}</p>
            <div className="float-right text-sm mt-[0.2rem] mb-auto">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  status === "authenticated" ? "bg-green-400" : "bg-gray-300"
                } animate-pulse mr-1`}
              ></span>
              {status === "authenticated" ? "Online" : "Offline"}
            </div>
          </div>
          <div
            onClick={() => router.push("/hub")}
            className="flex ml-auto h-[3.5rem] w-[3.5rem] cursor-pointer bg-slate-700 my-auto mr-[1.1rem] rounded"
          ></div>
        </div>

        {/* Text Container */}
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          <div className="flex w-full mt-2 space-x-3 max-w-xs">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                2 min ago
              </span>
            </div>
          </div>
          <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div className="bg-slate-800 text-white p-3 rounded-l-lg rounded-br-lg">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod.
                </p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                2 min ago
              </span>
            </div>
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          </div>
          <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div className="bg-slate-800 text-white p-3 rounded-l-lg rounded-br-lg">
                <p className="text-sm">Lorem ipsum dolor sit amet.</p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                2 min ago
              </span>
            </div>
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          </div>
          <div className="flex w-full mt-2 space-x-3 max-w-xs">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                2 min ago
              </span>
            </div>
          </div>
          <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div className="bg-slate-800 text-white p-3 rounded-l-lg rounded-br-lg">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                2 min ago
              </span>
            </div>
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          </div>
          <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div className="bg-slate-800 text-white p-3 rounded-l-lg rounded-br-lg">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                2 min ago
              </span>
            </div>
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          </div>
          <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div className="bg-slate-800 text-white p-3 rounded-l-lg rounded-br-lg">
                <p className="text-sm">Lorem ipsum dolor sit amet.</p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                2 min ago
              </span>
            </div>
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          </div>
          <div className="flex w-full mt-2 space-x-3 max-w-xs">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                2 min ago
              </span>
            </div>
          </div>
          <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div className="bg-slate-800 text-white p-3 rounded-l-lg rounded-br-lg">
                <p className="text-sm">Lorem ipsum dolor sit.</p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                2 min ago
              </span>
            </div>
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          </div>
        </div>

        {/* Input */}
        <div className="bg-gray-300 flex flex-row p-4">
          <input
            className="flex items-center h-10 w-full rounded px-3 text-sm"
            type="text"
            placeholder="Type your message…"
          />
          <div className="flex h-[2.4rem] w-[2.7rem] m-auto ml-3 rounded cursor-pointer bg-slate-900">
            t
          </div>
        </div>
      </div>
    </div>
  );
}
