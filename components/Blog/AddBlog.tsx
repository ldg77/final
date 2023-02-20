import Form from "../Form/Form";

function AddBlog() {
  const formInfo = {
    fields: {
      title: "text",
      theme: "text",
      message: "textarea",
    },
    userpath: "blog",
    slogan: "Define data for new blog",
  };

  return (
    <div className=" grid place-content-center ">
      <Form formInfo={formInfo} />
    </div>
  );
}

export default AddBlog;
