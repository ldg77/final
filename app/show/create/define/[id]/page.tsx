"use client";
import LayoutItemColor from "@/components/Layout/LayoutItemParts/LayoutItemColor";
import { useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

function page({ params: { id } }: Props) {
  return (
    <div className="flex-1">
      <p>define properties for layout item: {id}</p>
      <LayoutItemColor path={id} />
    </div>
  );
}

export default page;
