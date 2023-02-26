import Footer from "@/components/Footer";
import React from "react";

function page() {
  return (
    <div className="flex-1 flex flex-col gap-5 text-2xl font-bold p-5 text-center">
      <p className="text-center p-3 ">Step 5 / 5 : Define every layout item </p>
      <p>You can define individual Items here</p>
      <p>Select a item to start</p>
      <Footer prev={"layout"} next={"page"} />
    </div>
  );
}

export default page;
