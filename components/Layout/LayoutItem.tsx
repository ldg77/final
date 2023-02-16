"use client";

import updateLayoutItem from "@/lib/updateLayoutItem";

type Prop = {
  id: string;
  value: string | "";
  useremail: string;
};

function LayoutItem({ id, value, useremail }: Prop) {
  console.log(value);
  updateLayoutItem(id, "layouts", "layoutItemName", value, useremail);
  return (
    <div className="w-full flex flex-col p-1">
      <p className="text-center flex-1 bg-inherit">{value}</p>
    </div>
  );
}

export default LayoutItem;
