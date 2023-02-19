"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

import getBreackpoints from "@/lib/getBreackpoints";
import getSessionUser from "@/lib/getSessionUser";
import getLayout from "@/lib/getLayout";
import Footer from "../Footer";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
// function getWindowSize() {
//   const { innerWidth: width, innerHeight: height } = window;
//   return {
//     width,
//     height,
//   };
// }
function Layout() {
  const { data: session } = useSession();
  const [layouts, setLayouts] = useState({});
  const [items, setItems] = useState([]);
  const [windowDimentions, setWindowDimentions] = useState({
    width: 1920,
    height: 1080,
  });
  const getSize: string = Object.keys(getBreackpoints)
    .sort((a: any, b: any) => b - a)
    .find((el) => windowDimentions.width! >= +el)!;

  const generateLayoutTemplate = (arr: any) => {
    return Object.values(getBreackpoints).reduce((acc, el) => {
      (acc as any)[el] = arr.reduce((accu: any, item: string) => {
        accu = [...accu, { i: item, w: 2, h: 2, x: 0, y: 0 }];
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
    // const actualLayoutRes = await fetch(
    //   `/api/user/path/${session?.user?.email}/layout`
    // );
    // const aktualLayout = await actualLayoutRes.json();
    // console.log("bin drin");
    // const resLayout = await fetch(
    //   "/api/layout/" + aktualLayout.data?.layout._id,
    //   {
    //     method: "PATCH",
    //     body: JSON.stringify(layouts),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //     },
    //   }
    // );
    setLayouts(layouts);
  };

  // Use Effect to call listener on resize

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      setWindowDimentions({ width: width, height: height });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    getLayout(session?.user?.email!).then(async (res) => {
      if (res.approved) {
        setLayouts(res.data.layout.layouts);
        setItems(res.data.layout.layouts[(getBreackpoints as any)[getSize]]);
      } else {
        const user = await getSessionUser(session);
        const layoutsTemplate = generateLayoutTemplate(
          Object.keys(user.type.layoutitem)
        );
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
    <div className="flex-1">
      {/* <button
        className="border px-3 py-1 rounded bg-blue-400 text-white capitalize"
        onClick={async () => {
          setItems([
            { i: `section ${items.length}`, w: 2, h: 2, x: 0, y: 0 } as never,
            ...items,
          ]);
        }}
      >
        Add
      </button> */}

      <ResponsiveReactGridLayout
        className="layout mx-auto "
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
            {el.i}
            {/* <LayoutItem
              id={el.i}
              value={el.i || ""}
              useremail={session?.user?.email!}
            /> */}
          </div>
        ))}
      </ResponsiveReactGridLayout>
      <Footer prev={"maincolors"} next={"define"} />
    </div>
  );
}

export default Layout;
