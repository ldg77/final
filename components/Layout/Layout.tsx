"use client";

import storeData from "@/lib/storeData";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { toast } from "react-hot-toast";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function Layout() {
  const { data: session } = useSession();
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("layout")!).lg || []
  );
  const [layouts, setLayouts] = useState(
    JSON.parse(localStorage.getItem("layout")!) || {}
  );

  const onLayoutChange = (
    layout: ReactGridLayout.Layout[],
    layouts: ReactGridLayout.Layouts
  ) => {
    const info = toast.loading(
      `${session?.user?.name} we upload the data in layouts`
    );
    storeData(`layout`, JSON.stringify(layouts), session);
    setLayouts(layouts);
    localStorage.setItem("layout", JSON.stringify(layouts));
    toast.success("Uploading done ....", { id: info });
  };
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
            setItems([{ i: Date.now(), w: 2, h: 2, x: 0, y: 0 }, ...items])
          }
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
        {items.map((el: any) => (
          <div
            key={el.i}
            data-grid={el}
            className="flex justify-between border border-black relative overflow-hidden bg-slate-300/50"
          >
            bla
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default Layout;
