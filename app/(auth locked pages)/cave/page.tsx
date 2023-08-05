import Disablessr from "../../../components/disablessr";
import { CaveClient } from "./cave.client";

export default function Page() {
  return (
    <>
      <Disablessr>
        <CaveClient />
      </Disablessr>
    </>
  );
}
