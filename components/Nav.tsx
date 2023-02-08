"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function Nav() {
  const { data: session } = useSession();

  return (
    <div className="text-xl bg-slate-700/50 p-5 flex justify-between">
      <div className="menu flex  gap-3">
        <Link href="/">Main</Link>
        <Link href="/todos">Todos</Link>
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
  );
}

export default Nav;
