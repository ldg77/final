"use client";
import getBreackpoints from "@/lib/getBreackpoints";
import { useEffect, useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { toast } from "react-hot-toast";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

function PlayGround(data: any) {
  const [windowDimentions, setWindowDimentions] = useState({
    width: 1920,
    height: 1080,
  });

  const getSize: string = Object.keys(getBreackpoints)
    .sort((a: any, b: any) => b - a)
    .find((el) => windowDimentions.width! >= +el)!;

  const layoutsTemplate = data?.data?.layout?.layouts;

  const [layouts, setLayouts] = useState(layoutsTemplate);
  const [items, setItems] = useState(
    (layoutsTemplate as any)[(getBreackpoints as any)[getSize]]
  );

  const handleSaveLayout = async () => {
    const store = toast.loading("store new layout position");
    await fetch("/api/layout/" + data.data.layout._id, {
      method: "PATCH",
      body: JSON.stringify(layouts),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    toast.success("layout stored...", { id: store });
  };
  const onLayoutChange = async (
    layout: ReactGridLayout.Layout[],
    layouts: ReactGridLayout.Layouts
  ) => {
    setLayouts(layouts);
  };

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      setWindowDimentions({ width: width, height: height });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  return (
    <div className="flex-1">
      <button
        className="border px-3 py-1 rounded text-white capitalize mx-auto"
        onClick={handleSaveLayout}
      >
        save
      </button>

      <ResponsiveReactGridLayout
        className="layout mx-auto "
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 1 }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        rowHeight={100}
        width={2560}
        layouts={layouts}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        margin={[2, 2]}
        compactType={null}
      >
        {items?.map((el: any) => (
          <div
            key={el.i}
            data-grid={el}
            className="flex justify-center items-center bg-slate-300/20 capitalize rounded text-white"
          >
            {el.i}
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default PlayGround;
