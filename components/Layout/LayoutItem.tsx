"use client";

import getLayout from "@/lib/getLayout";
import updateLayoutItem from "@/lib/updateLayoutItem";
import { useState } from "react";

type Prop = {
  id: string;
  value: string | "";
  useremail: string;
};

function LayoutItem({ id, value, useremail }: Prop) {
  const [inputValue, setInputValue] = useState(value);

  const storeNameToLayoutItem = async () => {
    const modifiedLayout = await updateLayoutItem(
      id,
      "layouts",
      "layoutItemName",
      inputValue,
      useremail
    );
    const currentLayout = await getLayout(useremail);
    console.log(currentLayout);

    fetch("/api/layout/" + currentLayout.data._id, {
      method: "PATCH",
      body: JSON.stringify({ layouts: modifiedLayout }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  return (
    <div className="w-full">
      <input
        type="text"
        className="h-full w-full"
        placeholder="give a name"
        value={inputValue}
        onChange={(e) => setInputValue((prev) => (prev = e.target.value))}
        onMouseLeave={storeNameToLayoutItem}
      />
    </div>
  );
}

export default LayoutItem;
