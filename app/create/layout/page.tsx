import Footer from "@/components/Footer";
import Layout from "@/components/Layout/Layout";
import React from "react";

function page() {
  return (
    <div>
      <Layout />
      <Footer prev={"maincolors"} next={"layout"} />
    </div>
  );
}

export default page;
