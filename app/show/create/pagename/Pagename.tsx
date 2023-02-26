"use client";
import Form from "@/components/Form/Form";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import PreviewPagename from "./PreviewPagename";
import fetcher from "@/lib/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";

function Pagename() {
  const { data: session } = useSession();
  const {
    data: pagename,
    error,
    isLoading,
  } = useSWR(`/api/user/path/${session?.user?.email}/pagename`, fetcher, {
    refreshInterval: 10000,
  });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const formInfo = {
    fields: {
      pagename: "text",
      slogan: "text",
      avatar: "file",
    },
    slogan: "Step 2 / 5 : your website needs a ... ",
    userpath: "pagename",
    position: "center",
  };
  return (
    <div className="pagename-avatar flex-1 p-5 md:flex md:w-full md:justify-center md:items-center">
      {pagename.approved && <PreviewPagename />}
      <div className="input text-white  md:my-auto">
        <Form formInfo={formInfo} />
      </div>
    </div>
  );
}
export default Pagename;
