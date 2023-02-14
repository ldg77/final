"use client";
import fetcher from "@/lib/fetcher";
import getBreackpoints from "@/lib/getBreackpoints";
import getWindowSize from "@/lib/getWindowSize";
import Link from "next/link";
import { toast } from "react-hot-toast";
import useSWR from "swr";

function ListItem() {
  const { data, error, isLoading } = useSWR("/api/layout/handler", fetcher, {
    refreshInterval: 10000,
  });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const getSize: string = Object.keys(getBreackpoints())
    .sort((a: any, b: any) => b - a)
    .find((el) => getWindowSize().width >= +el)!;
  if (!data[0])
    toast.error("no layouts fond, please go back an define a new layout", {
      duration: 2000,
    });
  return (
    <div className="flex w-full flex-shrink">
      {data[0]?.layouts[(getBreackpoints() as any)[getSize]].map(
        (item: any) => (
          <Link
            key={item.i}
            href={`/create/define/${item.i}`}
            className="w-1/5 flex-1"
          >
            <button>Item:{item.name}</button>
          </Link>
        )
      )}
    </div>
  );
}

export default ListItem;
