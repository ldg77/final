"use client";

import useLoadData from "@/lib/loadData";
import storeData from "@/lib/storeData";
import { uuidv4 } from "@firebase/util";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { toast } from "react-hot-toast";
import LayoutItem from "./LayoutItem";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function getWindowDimention() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
function Layout() {
  const { data: session } = useSession();
  const pagename = useLoadData("layout");
  const last = pagename?.docs[pagename.docs.length - 1]?.data();
  const [layouts, setLayouts] = useState(last?.data);
  const [windowDimentions, setWindowDimentions] = useState(
    getWindowDimention()
  );
  const [items, setItems] = useState([]);
  const breakpoints: any = {
    1200: "lg",
    996: "md",
    768: "sm",
    480: "xs",
    0: "xxs",
  };
  const getSize: string = Object.keys(breakpoints)
    .sort((a: any, b: any) => b - a)
    .find((el) => windowDimentions.width >= +el)!;

  // handler to check if any changes on layout
  const onLayoutChange = (
    layout: ReactGridLayout.Layout[],
    layouts: ReactGridLayout.Layouts
  ) => {
    setLayouts(layouts);
  };

  // Use Effect to call listener on resize
  useEffect(() => {
    function handleResize() {
      setWindowDimentions(getWindowDimention());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div className="flex-1 h">
      <div className="nav">
        <button
          className="border px-3 py-1 rounded bg-blue-400 text-white capitalize"
          onClick={() => {
            setLayouts({});
          }}
        >
          reset
        </button>
        <button
          className="border px-3 py-1 rounded bg-blue-400 text-white capitalize"
          onClick={() =>
            setItems([
              { i: uuidv4(), w: 2, h: 2, x: 0, y: 0 } as never,
              ...items,
            ])
          }
        >
          Add
        </button>
        <button
          className="border px-3 py-1 rounded bg-blue-400 text-white capitalize"
          onClick={() => {
            if (!last) {
              toast.error("No layouts found", { duration: 1000 });
            } else {
              const actualItems = last.data[breakpoints[getSize]];
              !actualItems
                ? toast.error("No layout found on this screensize. Create new!")
                : setItems(actualItems);

              setLayouts(last.data);
            }
          }}
        >
          load layout
        </button>
        <button
          className="border px-3 py-1 rounded bg-blue-400 text-white capitalize"
          onClick={() => {
            const modifiedForFirebase = Object.keys(layouts).reduce(
              (acc: any, el) => {
                acc[el] = (layouts as any)[el].map((item: any) => {
                  const { i, x, y, h, w } = item;
                  return { i, x, y, h, w };
                });
                return acc;
              },
              {}
            );
            storeData(`layout`, modifiedForFirebase, session);
            toast.success("layout stored...", { duration: 1000 });
          }}
        >
          save layout
        </button>
      </div>
      <ResponsiveReactGridLayout
        className="layout mx-auto"
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 1 }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        rowHeight={70}
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
            className="flex justify-between border border-black relative overflow-hidden bg-slate-300/50"
          >
            <LayoutItem id={el.i} session={session} />
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default Layout;
