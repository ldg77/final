import Footer from "@/components/Footer";
import React from "react";
import Iframe from "react-iframe";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="info flex flex-col gap-5 backdrop-blur-md">
      <div className="description text-white text-center py-5 ">
        Step 4 / 5 : Define your layout
      </div>
      {children}
      <div className="frame hidden sm:block sm:h-[300px] lg:min-h-screen">
        <Iframe
          url={`${process.env.HOST}/show/page`}
          width="100%"
          height="100%"
        />
      </div>
      <Footer prev={"maincolors"} next={"define"} />
    </div>
  );
}

export default layout;
