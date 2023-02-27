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
      avatar: "file",
      message: "textarea",
    },
    userpath: "comment",
    slogan: "add a comment",
    options: { blog },
    dispatch: setShow,
    color: "white",
  };
  return (
    <div className="absolute right-8 z-20 bg-slate-900 rounded text-white">
      {" "}
      <div>
        <Form formInfo={formInfo} />
      </div>
    </div>
  );
}

export default AddCommentToBlog;
