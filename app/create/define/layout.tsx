import getLayout from "@/lib/getLayout";
import React from "react";

async function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="layoutsList">liste</div>
      {children}
    </div>
  );
}

export default layout;
