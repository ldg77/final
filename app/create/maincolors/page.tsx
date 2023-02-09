import Footer from "@/components/Footer";
import Form from "@/components/Form/Form";
import React from "react";

type props = {
  fields: object;
  userpath: string;
  slogan: string;
};

function page() {
  const formInfo: props = {
    fields: {
      "background color": "color",
      "text color": "color",
    },
    slogan: "background color / text color ",
    userpath: "maincolors",
  };
  return (
    <div className="h-full flex flex-col">
      <div className="maincolors flex-1 md:flex md:w-full md:mx-auto">
        <div className="res bg-black text-white h-1/2 md:my-auto md:w-1/2">
          bla
        </div>
        <div className="input flex-1 h-1/2 grid place-content-center md:my-auto md:w-1/2">
          <Form formInfo={formInfo} />
        </div>
      </div>
      <Footer prev={"home"} next={"layout"} />
    </div>
  );
}

export default page;
