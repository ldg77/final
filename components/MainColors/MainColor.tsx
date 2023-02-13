"use client";

import loadData from "@/lib/loadData";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Footer from "../Footer";
import Form from "../Form/Form";

type PagenameType = {
  backgroundColor: string;
  textColor: string;
};

function MainColor() {
  const { data: session } = useSession();
  const INITIAL: PagenameType = {
    backgroundColor: "",
    textColor: "",
  };
  const [maincolor, setMainColor] = useState(INITIAL);

  const formInfo = {
    fields: {
      backgroundColor: "color",
      textColor: "color",
    },
    slogan: "Background color / Text color ",
    userpath: "maincolor",
  };

  useEffect(() => {
    loadData(session as Session, "maincolor").then((res) =>
      setMainColor(res[0].data().data)
    );
  }, []);
  return (
    <>
      <div className="maincolors flex-1 md:flex md:w-full lg:mx-auto">
        <div className="res  bg-black text-white h-1/2 lg:h-5/6 md:my-auto md:w-1/2 flex flex-col justify-center items-center gap-4 font-extrabold md:rounded-l-2xl">
          <h1>Selected colors</h1>
          <div className="flex justify-center items-center gap-5 w-full">
            <div className="bg w-1/5 lg:w-1/4 text-center">
              <p>Background</p>
              <div
                className="w-full aspect-square rounded"
                style={{ backgroundColor: maincolor?.backgroundColor }}
              ></div>
            </div>
            <div className="text w-1/5 lg:w-1/4 text-center">
              <p>Text color</p>
              <div
                className="w-full aspect-square rounded"
                style={{ backgroundColor: maincolor?.textColor }}
              ></div>
            </div>
          </div>
        </div>
        <div className="input flex-1 h-1/2 grid place-content-center md:my-auto md:w-1/2 border md:rounded-r-2xl lg:h-5/6">
          <Form formInfo={formInfo} />
        </div>
      </div>
      <Footer prev={"home"} next={"layout"} />
    </>
  );
}

export default MainColor;
