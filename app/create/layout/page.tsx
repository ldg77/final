import Footer from "@/components/Footer";
import Layout from "@/components/Layout/Layout";
import React from "react";

function page() {
  return (
    <div className="h-full flex flex-col ">
      <Layout />
      <Footer prev={"maincolors"} next={"layout"} />
    </div>
  );
}

export default page;
