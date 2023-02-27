import { Dispatch, SetStateAction } from "react";
import Form from "../Form/Form";

type Prop = {
  setShow: Dispatch<SetStateAction<boolean>>;
};

function AddBlog({ setShow }: Prop) {
  const formInfo = {
    fields: {
      title: "text",
      theme: "text",
      message: "textarea",
    },
    userpath: "blog",
    slogan: "Define data for new blog",
    dispatch: setShow,
  };

  return (
    <div className=" absolute -right-1/2 z-20 bg-slate-900 rounded-2xl text-white ">
      <Form formInfo={formInfo} />
    </div>
  );
}

export default AddBlog;
