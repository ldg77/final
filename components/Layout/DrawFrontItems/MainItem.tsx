import React from "react";
type Prop = {
  itemdata: any;
};
function MainItem({ itemdata }: Prop) {
  return (
    <div style={{ ...itemdata }} className="h-full">
      MainItem
    </div>
  );
}

export default MainItem;
