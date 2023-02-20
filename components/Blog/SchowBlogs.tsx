import { useState } from "react";
import { BsFillFilePlusFill } from "react-icons/bs";
import AddBlog from "./AddBlog";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import Blog from "./Blog";
function SchowBlogs() {
  const [show, setShow] = useState(false);
  const { data, error, isLoading } = useSWR("/api/blog/handler", fetcher, {
    refreshInterval: 10000,
  });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(data);

  return (
    <div className="relative">
      <button className="add absolute right-0" onClick={() => setShow(!show)}>
        Create new Blog
        <BsFillFilePlusFill className="text-3xl" />
      </button>
      {show && <AddBlog />}
      <div className="blogs flex flex-col">
        {data?.map((el: any) => {
          return <Blog key={el._id} data={el} />;
        })}
      </div>
    </div>
  );
}

export default SchowBlogs;
