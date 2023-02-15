"use client";

import { useState } from "react";

type Prop = {
  id: string;
};

function LayoutItem({ id }: Prop) {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="w-full">
      <input
        type="text"
        className="h-full w-full"
        placeholder="give a name"
        value={inputValue}
        onChange={(e) => setInputValue((prev) => e.target.value)}
      />
    </div>
  );
}

export default LayoutItem;
