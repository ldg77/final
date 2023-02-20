"use client";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

type props = {
  prev: string | undefined;
  next: string | undefined;
};

function Footer({ prev, next }: props) {
  const [show, setShow] = useState(false);
  return (
    <div className="footerNav flex justify-center items-center p-5 relative gap-7 text-white">
      {prev && (
        <Link
          className="relative"
          href={`/show/create/${prev !== "home" ? prev : ""}`}
          onMouseEnter={() => {
            setShow(true);
          }}
          onMouseLeave={() => {
            setShow(false);
          }}
        >
          {show && (
            <p className="absolute -top-3 right-full w-max animate-bounce transition-transform opacity-50 hidden sm:block">
              {`previous step ${prev}`}
            </p>
          )}
          <ArrowLeftIcon className="w-10 h-10 animate-pulse hover:opacity-60 hover:shadow-2xl hover:-translate-x-2 duration-1000 transition-transform" />
        </Link>
      )}
      {next && (
        <Link
          className="relative"
          href={`/${next === "page" ? "show/page" : `show/create/${next}`}`}
          onMouseEnter={() => {
            setShow(true);
          }}
          onMouseLeave={() => {
            setShow(false);
          }}
        >
          {show && (
            <p className="absolute -top-3 left-full w-max animate-bounce transition-transform opacity-50 hidden sm:block">
              {`next step ${next}`}
            </p>
          )}
          <ArrowRightIcon className="w-10 h-10 animate-pulse hover:opacity-60 hover:shadow-2xl hover:translate-x-2 transition duration-1000" />
        </Link>
      )}
    </div>
  );
}

export default Footer;
