"use client";
import Footer from "@/components/Footer";
import Form from "@/components/Form/Form";
import loadData from "@/lib/loadData";

type props = {
  fields: {
    backgroundColor: string;
    textColor: string;
  };
  userpath: string;
  slogan: string;
};

function page() {
  const formInfo: props = {
    fields: {
      backgroundColor: "color",
      textColor: "color",
    },
    slogan: "background color / text color ",
    userpath: "maincolors",
  };

  const pagename = loadData(formInfo.userpath);
  const lastOne = pagename?.docs[pagename.docs.length - 1]?.data();

  return (
    <div className="h-full flex flex-col">
      <div className="maincolors flex-1 md:flex md:w-full lg:w-2/3 lg:mx-auto">
        <div className="res  bg-black text-white h-1/2 md:my-auto md:w-1/2 flex flex-col justify-center items-center gap-4 font-extrabold md:rounded-l-2xl">
          <h1>Selected colors</h1>
          <div className="bg w-1/4 text-center">
            <p>Background</p>
            <div
              className="w-full aspect-square rounded"
              style={{ backgroundColor: lastOne?.data.backgroundColor }}
            ></div>
          </div>
          <div className="text w-1/4 text-center">
            <p>Text color</p>
            <div
              className="w-full aspect-square rounded"
              style={{ backgroundColor: lastOne?.data.textColor }}
            ></div>
          </div>
        </div>
        <div className="input flex-1 h-1/2 grid place-content-center md:my-auto md:w-1/2 border md:rounded-r-2xl">
          <Form formInfo={formInfo} />
        </div>
      </div>
      <Footer prev={"home"} next={"layout"} />
    </div>
  );
}

export default page;
