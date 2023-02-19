import React from "react";
import Iframe from "react-iframe";
import Footer from "../Footer";
function LayoutDesign({ children }: any) {
  return (
    <div>
      <div className="info">
        <div className="description">bla</div>
        {children}
      </div>
      <div className="frame hidden sm:block">
        <Iframe
          url="http://localhost:3000/show/page"
          width="100%"
          height="100%"
        />
      </div>
      <Footer prev={"maincolors"} next={"define"} />
    </div>
  );
}

export default LayoutDesign;
