"use client";

import { useSession } from "next-auth/react";
import Form from "../Form/Form";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
type PagenameType = {
  backgroundColor: string;
  textColor: string;
};

function MainColor() {
  const INITIAL: PagenameType = {
    backgroundColor: "",
    textColor: "",
  };
  const formInfo = {
    fields: {
      backgroundColor: "color",
      textColor: "color",
    },
    slogan: "Step 3 / 5: Choose colors ",
    userpath: "maincolor",
  };

  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(
    `/api/user/path/${session?.user?.email}/maincolor`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div className="maincolors flex-1 md:flex md:w-full lg:mx-auto">
        <div className="res   text-white h-1/2 md:h-5/6 md:my-auto md:w-1/2 flex flex-col justify-center items-center gap-4 font-extrabold md:rounded-l-2xl">
          <h1>Preview</h1>
          <div className="flex justify-center items-center gap-5 w-full">
            <div className="bg flex justify-start items-center gap-2 text-center">
              <p>BG</p>
              <div
                className="w-8 aspect-video rounded"
                style={{
                  backgroundColor: data?.data?.maincolor?.backgroundColor,
                }}
              ></div>
            </div>
            <div className="text flex justify-start items-center gap-2 text-center">
              <p>TXT</p>
              <div
                className="w-8 aspect-video rounded"
                style={{ backgroundColor: data?.data?.maincolor?.textColor }}
              ></div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: data?.data?.maincolor?.backgroundColor,
              color: data?.data?.maincolor?.textColor,
            }}
            className="showResult aspect-video font-normal rounded p-5"
          >
            <p className="text-2xl">2 x large text </p>
            <p className="text-xl">extra large text </p>
            <p className="text-lg">large text </p>
            <p className="text-sm">small text </p>
            <p className="text-xs">extra small text </p>
          </div>
        </div>
        <div className="input flex-1 flex justify-center items-center h-1/2 p-5 md:my-auto md:w-2/3 md:rounded-r-2xl md:h-5/6 text-white">
          <Form formInfo={formInfo} />
        </div>
      </div>
    </>
  );
}

export default MainColor;
