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

  const generateLayoutTemplate = (arr: any) => {
    return Object.values(getBreackpoints).reduce((acc, el) => {
      (acc as any)[el] = arr.reduce((accu: any, item: string) => {
        accu = [...accu, { i: uuidv4(), w: 2, h: 2, x: 0, y: 0, name: item }];
        return accu;
      }, []);
      return acc;
    }, {});
  };
  // handler to check if any changes on layout
  const onLayoutChange = async (
    layout: ReactGridLayout.Layout[],
    layouts: ReactGridLayout.Layouts
  ) => {
    const actualLayoutRes = await fetch(
      `/api/user/path/${session?.user?.email}/layout`
    );
    const aktualLayout = await actualLayoutRes.json();
    console.log(aktualLayout);
    const resLayout = await fetch("/api/layout/" + aktualLayout.layout._id, {
      method: "PATCH",
      body: JSON.stringify(layouts),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const savedLayout = await resLayout.json();
    console.log(savedLayout);

    setLayouts(layouts);
  };

  // Use Effect to call listener on resize

  useEffect(() => {
    function handleResize() {
      setWindowDimentions(getWindowSize());
    }
    global.window.addEventListener("resize", handleResize);
    return () => global.window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    getLayout(session?.user?.email!).then(async (res) => {
      if (res.approved) {
        setLayouts(res.layout.layout.layouts);
        setItems(res.layout.layout.layouts[(getBreackpoints as any)[getSize]]);
      } else {
        const user = await getSessionUser(session);
        const layoutsTemplate = generateLayoutTemplate(user.type.layoutitem);
        const newLayoutRes = await fetch("/api/layout/handler", {
          method: "POST",
          body: JSON.stringify({
            layouts: layoutsTemplate,
            user: user._id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        setItems((layoutsTemplate as any)[(getBreackpoints as any)[getSize]]);
        setLayouts(layoutsTemplate);
      }
    });
  }, []);

  return (
    <div className="flex-1 h">
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
              value={el.name || ""}
              useremail={session?.user?.email!}
            />
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default Layout;
