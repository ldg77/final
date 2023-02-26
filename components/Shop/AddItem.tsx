"use client";
import { useSession } from "next-auth/react";
import React from "react";
import ClearButtonOnPath from "../ClearButtonOnPath";
import Form from "../Form/Form";

function AddItem() {
  const formInfoShop = {
    fields: {
      name: "text",
    },
    userpath: "shop",
    slogan: "add new shop name",
    position: "center",
  };
  const formInfoItem = {
    fields: {
      productName: "text",
      quantity: "number",
      avatar: "file",
      price: "number",
    },
    userpath: "shopitem",
    slogan: "add new item to your shop",
    position: "center",
  };

  return (
    <div className="gap-6 flex flex-col p-5">
      <div className="flex flex-col md:flex-row">
        <Form formInfo={formInfoShop} />
        <Form formInfo={formInfoItem} />
      </div>
      <ClearButtonOnPath path="shopitem" submit="clear shopitems" />
    </div>
  );
}

export default AddItem;
