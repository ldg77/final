"use client";
import fetcher from "@/lib/fetcher";
import Link from "next/link";
import useSWR from "swr";

function ListItem() {
  const { data, error, isLoading } = useSWR("/api/layout/handler", fetcher, {
    refreshInterval: 10000,
  });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  const avaibleWidth = Object.keys(data[0].layouts);
  console.log(avaibleWidth);

  return (
    <div>
      {data[0].layouts[avaibleWidth[0]].map((item: any) => (
        <Link href={`/create/define/${item.i}`}>
          <button>Item:{item.name}</button>
        </Link>
      ))}
    </div>
  );
}

export default ListItem;
