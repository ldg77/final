import Link from "next/link";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
export default function Home() {
  return (
    <main className="flex flex-col md:flex-row justify-center items-center h-screen text-center lg:w-2/3 lg:mx-auto lg">
      <div className="create h-1/3 md:h-full flex flex-col justify-end md:flex-row md:items-center w-full shadow ">
        <div className="flex flex-col md:flex-row md:gap-5 justify-center items-center">
          <span>Click here to build your website</span>
          <AiOutlineArrowRight className="rotate-90 md:rotate-0 text-2xl animate-pulse" />
        </div>
        <Link
          href="show/create/type"
          className="text-2xl p-10  uppercase hover"
        >
          Create
        </Link>
      </div>
      <div className="display bg-black h-1/3 md:h-full text-white flex flex-col justify-start md:flex-row md:items-center  w-full gap-1 shadow-xl">
        <Link
          href="show/page"
          className="text-2xl  bg-black/10 p-10  uppercase"
        >
          See
        </Link>
        <div className="flex flex-col md:flex-row md:gap-5 justify-center items-center">
          <AiOutlineArrowLeft className="rotate-90 md:rotate-0 text-2xl animate-pulse" />
          <span>Click here to see your Website</span>
        </div>
      </div>
    </main>
  );
}
