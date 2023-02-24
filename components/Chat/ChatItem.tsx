import { useSession } from "next-auth/react";
import React from "react";

function ChatItem({ data }: any) {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col gap-2 p-5">
      <div className="question flex gap-2 w-5/6 items-end">
        <img
          src={session?.user?.image!}
          alt="userIco"
          className="w-12 rounded-full"
        />
        <p className="flex-1">{data.question}</p>
      </div>
      <div className="answer flex  gap-2 w-full items-end text-end">
        <p className="flex-1">{data.answer}</p>
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
