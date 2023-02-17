"use client";
import Type from "@/components/Layout/LayoutItemParts/Type";
import { useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

function page({ params: { id } }: Props) {
  return (
    <div className="flex-1">
      <Type />
    </div>
  );
}

export default page;
