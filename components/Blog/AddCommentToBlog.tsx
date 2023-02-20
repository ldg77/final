import mongoose from "mongoose";
import React from "react";
import Form from "../Form/Form";
type Prop = {
  blog: mongoose.Schema.Types.ObjectId;
  setShow: any;
};
function AddCommentToBlog({ blog, setShow }: Prop) {
  const formInfo = {
    fields: {
      name: "text",
      message: "textarea",
    },
    userpath: "comment",
    slogan: "add a comment",
    options: { blog },
    dispatch: setShow,
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
