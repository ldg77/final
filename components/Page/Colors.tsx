"use client";
import useLoadData from "@/lib/loadData";

function Colors({ children }: any) {
  const pagename = useLoadData("maincolors");
  const lastOne = pagename?.docs[pagename.docs.length - 1]?.data()!;
  return (
    <div
      style={{
        backgroundColor: lastOne.backgroundColor,
        color: lastOne.textColor,
      }}
    >
      {children}
    </div>
  );
}

export default Colors;
