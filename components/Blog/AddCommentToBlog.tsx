import mongoose from "mongoose";
import React from "react";
import Form from "../Form/Form";
type Prop = {
  blog: mongoose.Schema.Types.ObjectId;
};
function AddCommentToBlog({ blog }: Prop) {
  const formInfo = {
    fields: {
      name: "text",
      message: "textarea",
    },
    userpath: "comment",
    slogan: "",
    options: { blog },
  };
  return (
    <div>
      {" "}
      <div>
        <Form formInfo={formInfo} />
      </div>
    </div>
  );
}

export default AddCommentToBlog;
