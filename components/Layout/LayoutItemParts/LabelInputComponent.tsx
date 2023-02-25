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
      <label className="flex justify-between w-full gap-1 p-1 md:gap-5 md:p-3 ">
        <div className="flex-1 flex justify-between">
          {name}
          <input
            type={type}
            value={data[name]}
            onChange={handleChange}
            name={name}
            className="rounded  text-black lg:w-1/4"
            pattern="^\d*(\.\d{0,2})?$"
          />
        </div>
        <div className="relative hover:cursor-pointer">
          <InformationCircleIcon
            className="w-4 lg:w-6 text-white"
            onClick={handleClick}
          />
        </div>
      </label>
      {chatData.show && (
        <ChatResponse setChatData={setChatData} chatData={chatData} />
      )}
    </div>
  );
}

export default LabelInputComponent;
