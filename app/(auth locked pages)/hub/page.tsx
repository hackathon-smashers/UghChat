import { SignOut } from "../../actions";

import { HubClient } from "../../../components/hub.client";

import Smoke from "../../../components/smokeeffect/SmokeEffect";

export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        <div className="h-screen w-full mx-[4rem] bg-white flex flex-col space-y-2 lg:space-y-[0.8rem] justify-center items-center">
        <div className="flex mx-[4rem] flex-col flex-grow">
          <div className="flex flex-row my-[1rem]">
            <h1 className="font-bold text-2xl mr-auto lg:text-3xl lg:mt-[2.5rem] text-slate-900">
              UghChat
            </h1>
              <SignOut/>
          </div>

          <HubClient />
        </div>
      </div>
      <Smoke/>

    </div>
  );
}
