import Footer from "@/components/Footer";
import Layout from "@/components/Layout/Layout";
import getLayout from "@/lib/getLayout";
import React from "react";

async function page() {
  let actualLayout = await getLayout();
  if (!actualLayout) {
    await fetch("http://localhost:3000/api/layout/handler", {
      method: "POST",
      body: JSON.stringify({ layouts: { lg: [] } }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
  actualLayout = await getLayout();
  return (
    <div className="h-full flex flex-col ">
      <Layout actualLayout={actualLayout} />
      <Footer prev={"maincolors"} next={"define"} />
    </div>
  );
}

export default page;
