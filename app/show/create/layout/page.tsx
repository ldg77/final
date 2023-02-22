import Layout from "@/components/Layout/Layout";
import React from "react";

async function page() {
  return (
    <div className="h-full flex flex-col backdrop-blur-md">
      <Layout />
    </div>
  );
}

export default page;
