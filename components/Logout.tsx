"use client";
import { signOut, useSession } from "next-auth/react";

function Logout() {
  const { data: session } = useSession();
  return (
    <div
      id="userDropdown"
      className="z-10 absolute top-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 right-5"
    >
      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
        <div>{session?.user?.name}</div>
        <div className="font-medium truncate">{session?.user?.email}</div>
      </div>
      <div className="py-1">
        <button
          onClick={() => signOut()}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Logout;
