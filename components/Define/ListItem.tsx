"use client";
import getBreackpoints from "@/lib/getBreackpoints";
import getLayout from "@/lib/getLayout";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function getWindowSize() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function ListItem() {
  const { data: session } = useSession();
  const [data, setData] = useState({});
  const pathname = usePathname();
  console.log(pathname);

  useEffect(() => {
    getLayout(session?.user?.email!).then((res) => {
      console.log(res);

      if (!res.approved) {
        toast.error("no layouts found", {
          duration: 2000,
        });
      } else {
        setData(res.data.layout.layouts);
      }
    });
  }, [session?.user?.email!]);

  const getSize: string = Object.keys(getBreackpoints)
    .sort((a: any, b: any) => b - a)
    .find((el) => getWindowSize().width >= +el)!;

  return (
    <ul className="w-64 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {(data as any)[(getBreackpoints as any)[getSize]]?.map((item: any) => (
        <li
          key={item.i}
          className={` w-full px-4 py-2 border-b border-gray-200  dark:border-gray-600 ${
            pathname?.includes(item.i) && "active-link"
          }`}
        >
          <Link href={`/show/create/define/${item.i}`}>
            Item :{" "}
            <span className="capitalize  font-mono hover:animate-pulse">
              {item.i}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ListItem;
