import React, { Dispatch, SetStateAction } from "react";
import Form from "../Form/Form";
type Prop = {
  data: any;
};
function Comment({ data }: Prop) {
  const created = new Date(data.createdAt);
  return (
    <div className="px-5">
      <div>
        {data.avatar && <img src={data.avatar} alt="avatar" className="w-12" />}
        {data.name} wrote:
      </div>
      <p>{data.message}</p>
      <p className="font-extralight text-right ">
        written on {created.toLocaleString()}
      </p>
    </div>
  );
}

export default Comment;
