"use client";

import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import Form from "../Form/Form";

function Pagename({ pageData }: any) {
  const formInfo = {
    fields: {
      pagename: "text",
      slogan: "text",
      avatar: "file",
    },
    slogan: "Page Name / Slogan / Avatar ",
    userpath: "pagename",
  };

  const { data, error, isLoading } = useSWR("/api/pagename/handler", fetcher, {
    refreshInterval: 10000,
  });

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <div className="pagename-avatar flex-1 md:flex md:w-full lg:mx-auto">
        <div className="res bg-black text-white h-1/2 lg:h-5/6 md:my-auto md:w-1/2 flex flex-col justify-center items-center gap-4 font-extrabold md:rounded-l-xl">
          <img src={data[0].avatar} alt="" className="w-1/3 rounded " />
          <p>{data[0].pagename}</p>
          <p>{data[0].slogan}</p>
        </div>
        <div className="input flex-1 h-1/2 lg:h-5/6 grid place-content-center md:my-auto md:w-1/2 border md:rounded-r-2xl">
          <Form formInfo={formInfo} />
        </div>
      </div>
    </>
  );
}

export default Pagename;
