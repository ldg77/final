"use client";

import getSessionUser from "@/lib/getSessionUser";
import { uuidv4 } from "@firebase/util";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import LayoutItem from "./LayoutItem";
import LayoutItemInfo from "./LayoutItemInfo";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { log } from "console";
import { toast } from "react-hot-toast";

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
  const [showEdit, setShowEdit] = useState({ show: false, id: "" });
  const [layouts, setLayouts] = useState({});
  const [windowDimentions, setWindowDimentions] = useState(
    getWindowDimention()
  );

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
  const [items, setItems] = useState([]);

  // handler to check if any changes on layout
  const onLayoutChange = async (
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
          onClick={async () => {
            const resLayout = await fetch("/api/layout/handler");
            const res = await resLayout.json();
            if (!res[0]) {
              toast.error("no layouts found...", { duration: 1000 });
              return;
            }
            setLayouts(res[0].layouts);
            console.log(res[0].layouts);
            setItems(res[0].layouts[breakpoints[getSize]]);
            toast.success("layout loaded... ", { duration: 1000 });
          }}
        >
          load layout
        </button>
        <button
          className="border px-3 py-1 rounded bg-blue-400 text-white capitalize"
          onClick={async () => {
            toast.success("layout saved... ", { duration: 1000 });
            const user = await getSessionUser(session);
            await fetch("/api/layout/handler", {
              method: "POST",
              body: JSON.stringify({ layouts: layouts, user: user._id }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            });
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
            onDoubleClick={() =>
              setShowEdit((prev) => (prev = { show: !prev.show, id: el.i }))
            }
            className="flex justify-between border border-black overflow-hidden bg-slate-300/50"
          >
            <LayoutItem id={el.i} />
          </div>
        ))}
      </ResponsiveReactGridLayout>
      {showEdit.show && (
        <LayoutItemInfo id={showEdit.id} setShowEdit={setShowEdit} />
      )}
    </div>
  );
}

export default Layout;
