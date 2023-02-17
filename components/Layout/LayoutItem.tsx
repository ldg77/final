"use client";

import updateLayoutItem from "@/lib/updateLayoutItem";
import { useEffect } from "react";

type Prop = {
  id: string;
  value: string | "";
  useremail: string;
};

function LayoutItem({ id, value, useremail }: Prop) {
  useEffect(() => {
    updateLayoutItem(id, "layouts", "layoutItemName", value, useremail);
  }, [value]);

  return (
    <div className="w-full flex flex-col p-1">
      <p className="text-center flex-1 bg-inherit">{value}</p>
    </div>
  );
}

export default LayoutItem;
