import ChatResponse from "@/components/Form/ChatResponse";
import getAnswerFromGPT from "@/lib/getAnswerFromGPT";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-hot-toast";
type Prop = {
  value: string;
  handleChange: Dispatch<SetStateAction<any>>;
  data: any;
  type: string;
  name: string;
};
function LabelInputComponent({ value, handleChange, data, type, name }: Prop) {
  const { data: session } = useSession();
  const [chatData, setChatData] = useState({ show: false, answer: "" });
  const handleClick = () => {
    const message = toast.loading("we look for a answer...");

    getAnswerFromGPT(name, session).then((text) => {
      toast.success("answer ready :) ", { id: message });
      setChatData({ show: true, answer: text });
    });
  };
  return (
    <div className="flex justify-between items-center relative">
      <label className="block mb-2 text-sm font-medium text-slate-300 dark:text-white flex-1">
        {name}
        <input
          type={type}
          value={data[name]}
          onChange={handleChange}
          name={name}
          className="px-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          pattern="^\d*(\.\d{0,2})?$"
        />
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

export default LabelInputComponent;
