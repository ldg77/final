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
      <p>
        <span>pagename:</span>
        <span className="text-2xl font-bold text-white/90">
          {" "}
          {data?.data?.pagename?.pagename}
        </span>
      </p>
      <p>
        <span>slogan:</span>{" "}
        <span className="text-2xl font-bold text-white/90">
          {data?.data?.pagename?.slogan}
        </span>
      </p>
      <p>avatar</p>
      <img
        src={data?.data?.pagename?.avatar}
        alt=""
        className="w-1/3 rounded"
      />
    </div>
  );
}

export default PreviewPagename;
