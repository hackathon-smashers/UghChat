import { CaveClient } from "./cave.client";
import {DisableServerHydration} from "../../../components/DisableServerHydration";

export default function Page() {
  return (
    <>
      <DisableServerHydration>
        <CaveClient />
      </DisableServerHydration>
    </>
  );
}
