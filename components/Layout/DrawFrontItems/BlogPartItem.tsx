import AddBlog from "@/components/Blog/AddBlog";
import SchowBlogs from "@/components/Blog/SchowBlogs";
import React from "react";
type Prop = {
  itemdata: any;
};
function BlogPartItem({ itemdata }: Prop) {
  return (
    <div style={{ ...itemdata }} className="h-full">
      <SchowBlogs />
      <AddBlog />
    </div>
  );
}

export default BlogPartItem;
