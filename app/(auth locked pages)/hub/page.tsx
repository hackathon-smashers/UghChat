import { SignOut } from "../../actions";

import { HubClient } from "../../../components/hub.client";

export default function Page() {
  return (
    <div className="h-screen max-w-screen bg-white flex flex-col space-y-2 lg:space-y-[0.8rem] lg:justify-center lg:items-center">
      <div className="flex px-[2rem] lg:mx-auto flex-col flex-grow">
        <div className="flex flex-row my-[1rem]">
          <h1 className="font-bold text-2xl mr-auto lg:text-3xl lg:mt-[2.5rem] text-slate-900">
            UghChat
          </h1>
            <SignOut/>
        </div>

        <HubClient />
      </div>
    </div>
  );
}
