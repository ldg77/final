"use client";
import LayoutItemColor from "@/components/Layout/LayoutItemParts/LayoutItemColor";
import { useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

function page({ params: { id } }: Props) {
  console.log(id);

  return (
    <div className="flex-1">
      <LayoutItemColor path={id} />
    </div>
  );
}

export default page;
