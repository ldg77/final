import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

import getBreackpoints from "@/lib/getBreackpoints";
import getSessionUser from "@/lib/getSessionUser";
import PlayGround from "./PlayGround";
import getDataonPath from "@/lib/getDataOnPath";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const checkLayout = async () => {
  const data = await getDataonPath("layout");
  return data;
};

async function LayoutComponent() {
  const session = await getServerSession(authOptions);
  const layoutData = await checkLayout();

  const generateLayoutTemplate = (arr: any) => {
    return Object.values(getBreackpoints).reduce((acc, el) => {
      (acc as any)[el] = arr.reduce((accu: any, item: string) => {
        accu = [...accu, { i: item, w: 2, h: 2, x: 0, y: 0 }];
        return accu;
      }, []);
      return acc;
    }, {});
  };

  if (layoutData.approved) {
    return <PlayGround data={layoutData.data} />;
  }
  const type = await getDataonPath("type");
  console.log(type);

  const layoutsTemplate = generateLayoutTemplate(
    Object.keys(type.data.type.layoutitem)
  );
  const newLayoutRes = await fetch(`${process.env.HOST}/api/layout/handler`, {
    method: "POST",
    body: JSON.stringify({
      layouts: layoutsTemplate,
      user: type.data.type.user,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  console.log(layoutsTemplate);

  return <PlayGround data={layoutsTemplate} />;

  // handler to check if any changes on layout

  // const handleSaveLayout = async () => {
  //   const actualLayoutRes = await fetch(
  //     `/api/user/path/${session?.user?.email}/layout`
  //   );
  //   const aktualLayout = await actualLayoutRes.json();
  //   console.log("bin drin");
  //   const resLayout = await fetch(
  //     "/api/layout/" + aktualLayout.data?.layout._id,
  //     {
  //       method: "PATCH",
  // body: JSON.stringify(layouts),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //       },
  //     }
  //   );
  // };

  // Use Effect to call listener on resize

  // useEffect(() => {
  //   getLayout(session?.user?.email!).then(async (res) => {
  //     if (res.approved) {
  //       setLayouts(res.data.layout.layouts);
  //       setItems(res.data.layout.layouts[(getBreackpoints as any)[getSize]]);
  //     } else {
  //       const user = await getSessionUser(session);
  //       const layoutsTemplate = generateLayoutTemplate(
  //         Object.keys(user.type.layoutitem)
  //       );
  //       const newLayoutRes = await fetch("/api/layout/handler", {
  //         method: "POST",
  //         body: JSON.stringify({
  //           layouts: layoutsTemplate,
  //           user: user._id,
  //         }),
  //         headers: {
  //           "Content-type": "application/json; charset=UTF-8",
  //         },
  //       });
  //       setItems((layoutsTemplate as any)[(getBreackpoints as any)[getSize]]);
  //       setLayouts(layoutsTemplate);
  //     }
  //   });
  // }, [session]);
}

export default LayoutComponent;
