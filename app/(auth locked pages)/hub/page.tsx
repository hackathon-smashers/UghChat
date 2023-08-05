import { SignOut } from "../../actions";

import { HubClient } from "./hub.client";
import Disablessr from "../../../components/disablessr";

export default function Page() {
  return (
    <div className="min-h-full min-w-full bg-white flex flex-col space-y-2 lg:space-y-[0.8rem] lg:justify-center lg:items-center overflow-visible">
      <div className="flex ml-auto mr-auto flex-col">
        <div className="flex flex-row">
          <h1 className="font-bold text-2xl mr-auto lg:text-3xl lg:mt-[2.5rem] text-slate-900">
            UghChat
          </h1>
          <SignOut />
        </div>

        <Disablessr>
          <HubClient />
        </Disablessr>
      </div>
    </div>
  );
}
