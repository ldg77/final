"use client";

import getWindowSize from "@/lib/getWindowSize";
import { uuidv4 } from "@firebase/util";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import LayoutItem from "./LayoutItem";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

import getBreackpoints from "@/lib/getBreackpoints";
import getSessionUser from "@/lib/getSessionUser";
import getLayout from "@/lib/getLayout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function Layout() {
  const { data: session } = useSession();
  const [layouts, setLayouts] = useState({});
  const [items, setItems] = useState([]);
  const [windowDimentions, setWindowDimentions] = useState(getWindowSize());
  const getSize: string = Object.keys(getBreackpoints)
    .sort((a: any, b: any) => b - a)
    .find((el) => windowDimentions.width >= +el)!;

  // handler to check if any changes on layout
  const onLayoutChange = async (
    layout: ReactGridLayout.Layout[],
    layouts: ReactGridLayout.Layouts
  ) => {
    if (layout.length) {
      const sessionuser = await getSessionUser(session);

      const resLayout = await fetch("/api/layout/" + sessionuser.layout._id, {
        method: "PATCH",
        body: JSON.stringify({
          layouts: layouts,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    }

    setLayouts(layouts);
  };

  // Use Effect to call listener on resize
  useEffect(() => {
    function handleResize() {
      setWindowDimentions(getWindowSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    getLayout(session?.user?.email!).then(async (res) => {
      if (res.approved) {
        setLayouts(res.data.layouts);
        setItems(res.data.layouts[(getBreackpoints as any)[getSize]]);
      } else {
        const user = await getSessionUser(session);
        const newLayoutRes = await fetch("/api/layout/handler", {
          method: "POST",
          body: JSON.stringify({
            layouts: { lg: [], md: [], sm: [], xs: [], xxs: [] },
            user: user._id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const newLayout = await newLayoutRes.json();
        console.log(newLayout);
        setLayouts(newLayout.data.layouts);
      }
    });
  }, []);

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
          onClick={async () => {
            setItems([
              { i: uuidv4(), w: 2, h: 2, x: 0, y: 0 } as never,
              ...items,
            ]);
          }}
        >
          Add
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
            className="flex justify-between border border-black overflow-hidden bg-slate-300/50"
          >
            <LayoutItem
              id={el.i}
              value={el.layoutItemName || ""}
              useremail={session?.user?.email!}
            />
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default Layout;
