import Footer from "@/components/Footer";
import Layout from "@/components/Layout/Layout";
import LayoutDesign from "@/components/Page/LayoutDesign";
import React from "react";

async function page() {
  return (
    <div className="h-full flex flex-col ">
      <LayoutDesign>
        <Layout />
      </LayoutDesign>
    </div>
  );
}

export default page;
