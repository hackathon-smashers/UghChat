"use client";
import { useTargetUser } from "../../../hooks/useTargetUser";

export default function CaveClient() {
  const [user, setUser] = useTargetUser();

  return (
    <div className="bg-red-500 flex flex-col h-screen w-full">
      <div className="flex bg-blue-300 w-full h-[13%]"></div>

      <div className="flex bg-green-400 w-full h-[67%]"></div>
      <div className="flex bg-blue-400 w-full h-[20%]">
        <input type="text" />

        <div>Submit</div>
      </div>
    </div>
  );
}
