import { useState } from "react";
import { BsFillFilePlusFill } from "react-icons/bs";
import AddBlog from "./AddBlog";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import Blog from "./Blog";
import { useSession } from "next-auth/react";
function SchowBlogs() {
  const [show, setShow] = useState(false);
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(
    `/api/user/path/${session?.user?.email}/blog`,
    fetcher,
    { refreshInterval: 10000 }
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(data);

  return (
    <div className="relative ">
      <button
        className="add mx-auto right-0 flex flex-col justify-center items-center"
        onClick={() => setShow(!show)}
      >
        Create new Discussion
        <BsFillFilePlusFill className="text-3xl" />
      </button>
      {show && <AddBlog setShow={setShow} />}
      <div className="blogs flex flex-col space-y-6">
        {data?.data?.blog.map((el: any) => {
          return <Blog key={el._id} data={el} />;
        })}
      </div>
    </div>
  );
}

export default SchowBlogs;
