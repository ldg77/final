"use client";
import { useEffect, useState } from "react";
import DrawLayoutItem from "./DrawLayoutItem";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import getBreackpoints from "@/lib/getBreackpoints";
import { useSession } from "next-auth/react";
function getWindowDimention() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function DrawLayout() {
  const cols: any = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 1 };

  const [windowDimentions, setWindowDimentions] = useState(
    getWindowDimention()
  );
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(
    "/api/user/email/" + session?.user?.email,
    fetcher
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimentions(getWindowDimention());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  const getSize: string = Object.keys(getBreackpoints)
    .sort((a: any, b: any) => b - a)
    .find((el) => windowDimentions.width >= +el)!;
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div
      className="min-h-screen"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${
          cols[(getBreackpoints as any)[getSize]]
        },1fr)`,
        gridAutoRows: "min(1fr, 20px)",
        gridAutoColumns: "100px",
        gap: "2px",
      }}
    >
      {data?.layout?.layouts &&
        (data.layout.layouts as any)[(getBreackpoints as any)[getSize]]?.map(
          (el: any) => {
            return <DrawLayoutItem key={el.i} params={el} />;
          }
        )}
    </div>
  );
}

export default DrawLayout;
