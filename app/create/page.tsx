"use client";
import Footer from "@/components/Footer";
import Form from "@/components/Form/Form";
import loadData from "@/lib/loadData";

type props = {
  fields: {
    pagename: string;
    slogan: string;
    avatar: string;
  };
  userpath: string;
  slogan: string;
};

function page() {
  const formInfo: props = {
    fields: {
      pagename: "text",
      slogan: "text",
      avatar: "file",
    },
    slogan: "pagename / slogan / avatar",
    userpath: "pagename",
  };

  const pagename = loadData(formInfo.userpath);
  const lastOne = pagename?.docs[pagename.docs.length - 1]?.data();
  return (
    <div className="h-full flex flex-col">
      <div className="pagename-avatar flex-1 md:flex md:w-full lg:mx-auto">
        <div className="res bg-black text-white h-1/2 lg:h-5/6 md:my-auto md:w-1/2 flex flex-col justify-center items-center gap-4 font-extrabold md:rounded-l-xl">
          <img src={lastOne?.data.avatar!} alt="" className="w-1/3 rounded " />
          <p>{lastOne?.data.pagename}</p>
          <p>{lastOne?.data.slogan}</p>
        </div>
        <div className="input flex-1 h-1/2 lg:h-5/6 grid place-content-center md:my-auto md:w-1/2 border md:rounded-r-2xl">
          <Form formInfo={formInfo} />
        </div>
      </div>
      <Footer prev={""} next={"maincolors"} />
    </div>
  );
}

export default page;
