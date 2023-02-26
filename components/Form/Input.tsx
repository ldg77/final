import getAnswerFromGPT from "@/lib/getAnswerFromGPT";
import { DocumentIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-hot-toast";
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
    const message = toast.loading("we look for a answer...");

    getAnswerFromGPT(state.name, session).then((text) => {
      toast.success("answer ready :) ", { id: message });
      setChatData({ show: true, answer: text });
    });
  };
  return (
    <div className="flex justify-between items-center relative">
      <label className="block mb-2 text-sm font-medium text-slate-300 dark:text-white flex-1">
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
          aria-describedby="user_avatar_help"
          className={`block px-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400`}
        />
      </label>
      <div className="relative hover:cursor-pointer">
        <InformationCircleIcon
          className="w-8 text-white"
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
