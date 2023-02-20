import React from "react";
type Prop = {
  data: any;
};
function Blog({ data }: Prop) {
  return (
    <div className="shadow">
      <p>{data.title}</p>
      <p>{data.theme}</p>
      <p>{data.message}</p>
    </div>
  );
}

export default Blog;
