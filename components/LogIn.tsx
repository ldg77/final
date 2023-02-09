"use client";
import { signIn } from "next-auth/react";

function LogIn() {
  return (
    <div className="flex flex-col gap-2 h-screen justify-center items-center">
      <h1 className="text-xl opacity-20 animate-bounce">
        Please sign in , to access the create page
      </h1>
      <button
        onClick={() => signIn()}
        className="border rounded-xl bg-black text-white p-3 animate-pulse hover:opacity-50 transition-colors"
      >
        Sign in
      </button>
    </div>
  );
}

export default LogIn;
