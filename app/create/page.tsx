import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="flex flex-col h-full">
      <div className="pagename-avatar flex-1"></div>
      <div className="footerNav flex justify-center items-center">
        <Link href="/maincolors">
          <ArrowRightIcon className="w-10 h-10" />
        </Link>
      </div>
    </div>
  );
}

export default page;
