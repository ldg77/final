import AddBlog from "@/components/Blog/AddBlog";
import SchowBlogs from "@/components/Blog/SchowBlogs";
import React from "react";
type Prop = {
  itemdata: any;
};
function BlogPartItem({ itemdata }: Prop) {
  console.log(itemdata);

  return (
    <div style={{ ...itemdata }} className="h-full">
      <SchowBlogs />
    </div>
  );
}

export default BlogPartItem;
