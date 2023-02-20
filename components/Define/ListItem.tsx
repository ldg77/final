"use client";
import getBreackpoints from "@/lib/getBreackpoints";
import getLayout from "@/lib/getLayout";

import { useSession } from "next-auth/react";
import Link from "next/link";
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
    <div className="flex flex-col gap-2 ">
      {(data as any)[(getBreackpoints as any)[getSize]]?.map((item: any) => (
        <Link key={item.i} href={`/show/create/define/${item.i}`} className="">
          <button>Item:{item.i}</button>
        </Link>
      ))}
    </div>
  );
}

export default ListItem;
