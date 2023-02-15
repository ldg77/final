"use client";
import Type from "@/components/Layout/LayoutItemParts/Type";
import { useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

function page({ params: { id } }: Props) {
  const INITIAL = {
    type: {
      options: {
        unique: ["header", "main", "footer"],
        unlimited: "section",
      },
      id,
    },
  };

  const [data, setData] = useState(INITIAL);

  return (
    <div className="flex-1">
      <Type data={data.type} />
    </div>
  );
}

export default page;
