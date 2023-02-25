import { XMarkIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction } from "react";

type chat = {
  show: boolean;
  answer: string;
};

type Prop = {
  setChatData: Dispatch<SetStateAction<chat>>;
  chatData: chat;
};

function ChatResponse({ setChatData, chatData }: Prop) {
  return (
    <div className="absolute top-100 shadow-2xl z-20 bg-slate-900 py-3 px-5 w-full rounded">
      <XMarkIcon
        className="w-6 absolute right-0 top-0 hover:cursor-pointer"
        onClick={() => setChatData({ show: false, answer: "" })}
      />
      <p>{chatData.answer.slice(5, -1)}</p>
    </div>
  );
}

export default ChatResponse;
