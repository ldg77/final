import Footer from "@/components/Footer";
import React from "react";
import Iframe from "react-iframe";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="info">
        <div className="description text-white text-center py-5">
          Step 4 / 5 : Define your layout
        </div>
        {children}
        <Footer prev={"maincolors"} next={"define"} />
      </div>
      <div className="frame hidden sm:block sm:h-[300px] lg:min-h-full scroll-smooth">
        <Iframe
          url="http://localhost:3000/show/page"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}

export default layout;
