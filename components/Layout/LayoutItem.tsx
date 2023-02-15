"use client";

import getLayout from "@/lib/getLayout";
import updateLayoutItem from "@/lib/updateLayoutItem";
import { useState } from "react";

type Prop = {
  id: string;
};

function LayoutItem({ id }: Prop) {
  const [inputValue, setInputValue] = useState("");

  const storeNameToLayoutItem = async () => {
    const modifiedLayout = await updateLayoutItem(
      id,
      "layouts",
      "layoutItemName",
      inputValue
    );
    const currentLayout = await getLayout();
    fetch("/api/layout/" + currentLayout._id, {
      method: "PATCH",
      body: JSON.stringify({ layouts: modifiedLayout }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
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
