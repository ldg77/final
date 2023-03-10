"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Chat from "../../../components/Chat/Chat";
import Logout from "@/components/Logout";

function Nav() {
  const { data: session } = useSession();
  const [showChat, setShowChat] = useState(false);
  const [showLogout, setShowLogOut] = useState(false);

  return (
    <div className="text-xl bg-slate-800/20 p-3 flex justify-between items-center">
      <div className="menu flex  gap-3">
        <Link href="/" className="btn-form">
          Main
        </Link>
        <Link href="/show/page" className="btn-form">
          Page
        </Link>
      </div>
      <div className="flex justify-center items-center gap-2">
        {showChat && <Chat setShowChat={setShowChat} />}
        <p className=" sm:flex items-center gap-3  hidden text-xl uppercase">
          Any question?
        </p>
        <div
          onClick={() => {
            setShowChat((prev) => (prev = !prev));
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png"
            className="w-12 rounded-full animate-pulse hover:cursor-pointer"
            alt="chatIco"
          />
        </div>

        <img
          src={session?.user?.image!}
          alt=""
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => setShowLogOut(!showLogout)}
          data-dropdown-placement="bottom-start"
          id="avatarButton"
        />
        {showLogout && <Logout />}
      </div>
    </div>
  );
}

export default Nav;
