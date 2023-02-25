import { useSession } from "next-auth/react";
import React from "react";

function ChatItem({ data }: any) {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col gap-2 p-5 ">
      <div className="question flex gap-2 items-start justify-start">
        <img
          src={session?.user?.image!}
          alt="userIco"
          className="w-12 rounded-full"
        />
        <p className=" bg-slate-900/10 p-2 rounded font-medium text-xs lg:text-lg text-slate-900/90 ">
          {data.question}
        </p>
      </div>
      <div className="answer flex items-start justify-end gap-2 ">
        <p className=" bg-slate-900/90 p-2 rounded font-medium text-sm lg:text-lg text-white">
          {data.answer}
        </p>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png"
          className="w-12 rounded-full"
          alt="chatIco"
        />
      </div>
    </div>
  );
}

export default ChatItem;
