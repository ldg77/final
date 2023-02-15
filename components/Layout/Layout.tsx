"use client";

import getSessionUser from "@/lib/getSessionUser";
import getWindowSize from "@/lib/getWindowSize";
import { uuidv4 } from "@firebase/util";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import LayoutItem from "./LayoutItem";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

import { toast } from "react-hot-toast";
import getLayout from "@/lib/getLayout";
import getBreackpoints from "@/lib/getBreackpoints";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

type Prop = {
  actualLayout: any;
};

function Layout({ actualLayout }: Prop) {
  const { data: session } = useSession();
  const [layouts, setLayouts] = useState(actualLayout?.layouts || {});
  const [windowDimentions, setWindowDimentions] = useState(getWindowSize());

  const getSize: string = Object.keys(getBreackpoints())
    .sort((a: any, b: any) => b - a)
    .find((el) => windowDimentions.width >= +el)!;
  const [items, setItems] = useState(
    (actualLayout.layouts &&
      (actualLayout.layouts as any)[(getBreackpoints() as any)[getSize]]) ||
      []
  );

  // handler to check if any changes on layout
  const onLayoutChange = async (
    layout: ReactGridLayout.Layout[],
    layouts: ReactGridLayout.Layouts
  ) => {
    setLayouts(layouts);

    await fetch("/api/layout/" + actualLayout._id, {
      method: "PATCH",
      body: JSON.stringify({ layouts: layouts }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  // Use Effect to call listener on resize
  useEffect(() => {
    function handleResize() {
      setWindowDimentions(getWindowSize());
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
          onClick={async () => {
            setItems([
              { i: uuidv4(), w: 2, h: 2, x: 0, y: 0 } as never,
              ...items,
            ]);
            // await fetch("/api/layout/" + actualLayout._id, {
            //   method: "PATCH",
            //   body: JSON.stringify({ layouts: layouts }),
            //   headers: {
            //     "Content-type": "application/json; charset=UTF-8",
            //   },
            // });
          }}
        >
          Add
        </button>

        {/* Bug layout not loaded */}

        <button
          className="border px-3 py-1 rounded bg-blue-400 text-white capitalize"
          onClick={async () => {
            const res = await getLayout();
            if (!res) {
              toast.error("no layouts found...", { duration: 1000 });
              return;
            }
            if (res.layouts[(getBreackpoints() as any)[getSize]]) {
              // setLayouts(res.layouts[(getBreackpoints() as any)[getSize]]);
              // setItems(res.layouts[(getBreackpoints() as any)[getSize]]);
              toast.success("layout loaded... ", { duration: 1000 });
              return;
            }
            toast.error(
              "No layout founded for this window size. Create please a new one.",
              {
                duration: 1000,
              }
            );
          }}
        >
          load layout
        </button>
        <button
          className="border px-3 py-1 rounded bg-blue-400 text-white capitalize"
          onClick={async () => {
            // const user = await getSessionUser(session);

            // await fetch("/api/layout/handler", {
            //   method: "POST",
            //   body: JSON.stringify({ layouts: layouts, user: user._id }),
            //   headers: {
            //     "Content-type": "application/json; charset=UTF-8",
            //   },
            // });
            toast.success("layout saved... ", { duration: 1000 });
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
            className="flex justify-between border border-black overflow-hidden bg-slate-300/50"
          >
            <LayoutItem id={el.i} value={el.layoutItemName || ""} />
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default Layout;
