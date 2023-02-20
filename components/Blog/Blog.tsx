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
    <div className=" sm:w-1/2 sm:mx-auto shadow-lg relative">
      <button
        className="comment absolute bottom-0 right-0"
        onClick={() => setShow(!show)}
      >
        <BiCommentEdit />
      </button>

      <p>{data.title}</p>
      <p>{data.theme}</p>
      <p>{data.message}</p>
      <div className="comments">
        {data.comments.map((comment: any) => (
          <Comment key={comment._id} data={comment} />
        ))}
      </div>
      {show && <AddCommentToBlog blog={data._id} />}
    </div>
  );
}

export default Blog;
