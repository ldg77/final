"use client";
import useLoadData from "@/lib/loadData";
import { log } from "console";

function Colors({ children }: any) {
  const mainColors = useLoadData("maincolors");
  const lastOne = mainColors?.docs[mainColors.docs.length - 1]?.data()!;

  return (
    <div
      style={{
        backgroundColor: lastOne?.data.backgroundColor,
        color: lastOne?.data.textColor,
      }}
      className="h-full"
    >
      {children}
    </div>
  );
}

export default Colors;
