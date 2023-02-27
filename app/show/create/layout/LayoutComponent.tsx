import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

import PlayGround from "./PlayGround";
import getDataonPath from "@/lib/getDataOnPath";

const checkLayout = async () => {
  const data = await getDataonPath("layout");
  return data;
};

async function LayoutComponent() {
  const layoutData = await checkLayout();
  return <PlayGround data={layoutData.data} />;
}

export default LayoutComponent;
