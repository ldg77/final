"use client";
import useLoadData from "@/lib/loadData";
import { useEffect, useState } from "react";
import DrawLayoutItem from "./DrawLayoutItem";

function getWindowDimention() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function DrawLayout() {
  const layout = useLoadData("layout");
  const lastOne: any = layout?.docs[layout.docs.length - 1]?.data();

  const cols: any = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 1 };
  const breakpoints: any = {
    1200: "lg",
    996: "md",
    768: "sm",
    480: "xs",
    0: "xxs",
  };
  const [windowDimentions, setWindowDimentions] = useState(
    getWindowDimention()
  );
  const [layoutObj, setLayoutObj] = useState({});

  useEffect(() => {
    function handleResize() {
      setWindowDimentions(getWindowDimention());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  const getSize: string = Object.keys(breakpoints)
    .sort((a: any, b: any) => b - a)
    .find((el) => getWindowDimention().width >= +el)!;

  return (
    <div
      className="min-h-screen"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols[breakpoints[getSize]]},1fr)`,
        gridAutoRows: "min(1fr, 100px)",
        gridAutoColumns: "100px",
        gap: "2px",
      }}
    >
      {(layoutObj as any)[breakpoints[getSize]]?.map((el: any) => {
        return <DrawLayoutItem key={el.i} data={el} />;
      })}
    </div>
  );
}

export default DrawLayout;
