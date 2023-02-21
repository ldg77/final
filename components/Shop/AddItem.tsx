import React from "react";
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
    <div className="gap-6">
      <Form formInfo={formInfoShop} />
      <Form formInfo={formInfoItem} />
    </div>
  );
}

export default AddItem;
