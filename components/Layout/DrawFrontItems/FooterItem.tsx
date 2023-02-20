import React, { useState } from "react";
import Impressum from "./Impressum";
type Prop = {
  itemdata: any;
};
function FooterItem({ itemdata }: Prop) {
  const [show, setShow] = useState(false);
  return (
    <div className="text-center h-full" style={{ ...itemdata }}>
      <button onClick={() => setShow(!show)}>Impressum</button>
      {show && <Impressum />}
    </div>
  );
}

export default FooterItem;
