"use client";
import fetcher from "@/lib/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Form from "../Form/Form";

function Pagename() {
  const formInfo = {
    fields: {
      pagename: "text",
      slogan: "text",
      avatar: "file",
    },
    slogan: "Step 2 / 5 : your website needs a ... ",
    userpath: "pagename",
  };

  const { data: session } = useSession();

  const { data, error, isLoading } = useSWR(
    `/api/user/path/${session?.user?.email}/pagename`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(data);

  return (
    <>
      <div className="pagename-avatar flex-1 md:flex md:w-full lg:mx-auto">
        <div className="res text-white h-1/2 md:h-5/6 md:my-auto md:w-1/2 flex flex-col justify-center items-center gap-4 font-extrabold md:rounded-l-xl">
          <img
            src={data?.data?.pagename?.avatar}
            alt=""
            className="w-1/3 rounded "
          />
          <p>{data?.data?.pagename?.pagename}</p>
          <p>{data?.data?.pagename?.slogan}</p>
        </div>
        <div className="input flex-1 flex justify-center items-center h-1/2 p-5 md:my-auto md:w-2/3 text-white md:rounded-r-2xl md:h-5/6">
          <Form formInfo={formInfo} />
        </div>
      </div>
    </>
  );
}

export default Pagename;
