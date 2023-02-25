import getAnswerFromGPT from "@/lib/getAnswerFromGPT";
import { DocumentIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import ChatResponse from "./ChatResponse";

type props = {
  state: {
    name: string | "avatar";
    type: string;
  };
  setData: Dispatch<SetStateAction<{}>>;
  value?: string;
};
function Input({ state, setData, value }: props) {
  const { data: session } = useSession();
  const [chatData, setChatData] = useState({ show: false, answer: "" });
  const handleClick = () => {
    getAnswerFromGPT(state.name, session?.user?.name!).then((text) =>
      setChatData({ show: true, answer: text })
    );
  };
  return (
    <div className="flex justify-between items-center relative">
      <label className="flex justify-between w-full gap-1 p-1 md:gap-5 md:p-3 ">
        {state.name}
        <input
          onChange={(e) =>
            setData(
              (prev) =>
                (prev = {
                  ...prev,
                  [e.target.name]:
                    state.name === "avatar"
                      ? e.target.files![0]
                      : e.target.value,
                })
            )
          }
          value={value}
          name={state.name}
          type={state.type}
          className={`border-b border-slate-400  rounded outline-none text-black  ${
            state.type === "file" && "hidden"
          }`}
        />
        {state.type === "file" && (
          <DocumentIcon className="w-10 h-10 hover:cursor-pointer text-white" />
        )}
      </label>
      <div className="relative hover:cursor-pointer">
        <InformationCircleIcon
          className="w-4 lg:w-6 text-white"
          onClick={handleClick}
        />
      </div>
      {chatData.show && (
        <ChatResponse setChatData={setChatData} chatData={chatData} />
      )}
    </div>
  );
}

export default Input;
