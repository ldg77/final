import React from "react";
type Prop = {
  itemdata: any;
};
function ShopItem({ itemdata }: Prop) {
  return (
    <div style={{ ...itemdata }} className="h-full">
      ShopItem
    </div>
  );
}

export default ShopItem;
