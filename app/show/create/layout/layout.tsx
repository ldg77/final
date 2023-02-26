import Footer from "@/components/Footer";
import InfoComponents from "@/components/InfoComponents";
import React from "react";
import Iframe from "react-iframe";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="info flex-1 flex flex-col">
      <InfoComponents
        prev={{ first: "maincolor", second: "page" }}
        now={{ first: "layout", second: "page", step: 5 }}
        next={{ first: "define", step: 5 }}
      />
      {children}
      <div className="frame hidden sm:block sm:h-[300px] lg:min-h-screen">
        <Iframe
          url={`${process.env.HOST}/show/page`}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}

export default layout;
