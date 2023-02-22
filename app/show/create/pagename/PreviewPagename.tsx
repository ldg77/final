"use client";
import fetcher from "@/lib/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";

function PreviewPagename() {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(
    `/api/user/path/${session?.user?.email}/pagename`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div className="res text-white h-1/2 md:h-5/6 md:my-auto md:w-1/2 flex flex-col justify-center items-center gap-4 font-extrabold md:rounded-l-xl">
      <img
        src={data?.data?.pagename?.avatar}
        alt=""
        className="w-1/3 rounded "
      />
      <p>{data?.data?.pagename?.pagename}</p>
      <p>{data?.data?.pagename?.slogan}</p>
    </div>
  );
}

export default PreviewPagename;
