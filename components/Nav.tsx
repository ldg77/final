"use client";

import { signOut, useSession } from "next-auth/react";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import Chat from "./Chat";
import Image from "next/image";

function Nav() {
  const { data: session } = useSession();
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="text-xl bg-slate-800/20 p-3 flex justify-between items-center">
      <div className="menu flex  gap-3">
        <Link href="/">Main</Link>
        <Link href="/page">Page</Link>
      </div>
      <div className="flex justify-center items-center gap-2 ">
        {showChat && <Chat setShowChat={setShowChat} />}
        <p className=" sm:flex items-center gap-3 font-thin hidden text-xs">
          Any question?
        </p>
        <div
          onClick={() => {
            setShowChat((prev) => (prev = !prev));
          }}
        >
          <ChatBubbleBottomCenterIcon className="h-8 w-8 animate-pulse text-green-900/30 hover:cursor-pointer" />
        </div>
        <div
          className="logout flex justify-center items-center gap-3"
          onClick={() => signOut()}
        >
          <img
            src={session?.user?.image!}
            alt=""
            className="w-10 aspect-square rounded-full"
          />
          <Link href="/">Logout</Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
