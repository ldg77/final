import React, { useState } from "react";
import Comment from "./Comment";
import { BiCommentEdit } from "react-icons/bi";
import AddCommentToBlog from "./AddCommentToBlog";
type Prop = {
  data: any;
};
function Blog({ data }: Prop) {
  const [show, setShow] = useState(false);

  return (
    <div className=" relative">
      <button
        className="comment absolute bottom-2 right-2"
        onClick={() => setShow(!show)}
      >
        <BiCommentEdit />
      </button>

      <p>Title: {data.title}</p>
      <p>Theme: {data.theme}</p>
      <p>Message: {data.message}</p>
      <div className="comments border-b-2 py-2 ">
        {data.comments.map((comment: any) => (
          <Comment key={comment._id} data={comment} />
        ))}
      </div>
      {show && <AddCommentToBlog blog={data._id} setShow={setShow} />}
    </div>
  );
}

export default Blog;
