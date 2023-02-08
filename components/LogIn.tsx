"use client";
import { signIn } from "next-auth/react";

function LogIn() {
  return (
    <div>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}

export default LogIn;
