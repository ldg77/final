import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { Dispatch, SetStateAction } from "react";
import ChatInput from "./ChatInput";
import ChatList from "./ChatList";

type Props = {
  setShowChat: Dispatch<SetStateAction<boolean>>;
};

function Chat({ setShowChat }: Props) {
  return (
    <div className="absolute inset-0 lg:inset-16 bg-slate-100 z-30 flex flex-col overflow-y-auto">
      <div
        className="absolute right-0 top-0 hover:cursor-pointer "
        onClick={() => {
          setShowChat(false);
        }}
      >
        <XMarkIcon className="w-8 h-8" />
      </div>
      <ChatList />
      <ChatInput />
    </div>
  );
}

export default Chat;
