import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import React, { Dispatch, SetStateAction } from "react";
import Form from "../Form/Form";
type Prop = {
  id: any;
};

function Comment({ id }: Prop) {
  const { data, error, isLoading } = useSWR(`/api/comment/${id}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log(data);

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
