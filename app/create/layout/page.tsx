import Footer from "@/components/Footer";
import Layout from "@/components/Layout/Layout";
import getLayout from "@/lib/getLayout";
import React from "react";

async function page() {
  const actualLayout = await getLayout();
  console.log(actualLayout);

  return (
    <div className="h-full flex flex-col ">
      <Layout actualLayout={actualLayout} />
      <Footer prev={"maincolors"} next={"define"} />
    </div>
  );
}

export default page;
