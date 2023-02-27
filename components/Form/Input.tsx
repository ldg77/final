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
    <>
      <div className="flex justify-between items-center  dark:bg-gray-800 text-white">
        <label className=" flex-1 text-sm font-medium ">
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <div className="relative hover:cursor-pointer">
          <InformationCircleIcon className="w-6" onClick={handleClick} />
        </div>
        {chatData.show && (
          <ChatResponse setChatData={setChatData} chatData={chatData} />
        )}
      </div>
      {state.name === "avatar" && (
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          SVG, PNG, JPG or GIF (MAX. 800x400px).
        </p>
      )}
    </>
  );
}

export default Input;
