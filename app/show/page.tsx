import Link from "next/link";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
export default function Home() {
  return (
    <main className="flex flex-col md:flex-row justify-center items-center h-screen text-center lg:mx-auto lg">
      <div className="create h-1/3 md:h-full flex flex-col justify-end md:flex-row md:items-center w-full lg:w-1/2">
        <div className="flex flex-1 flex-col md:flex-row md:gap-5 justify-end items-center">
          <span>Click here to build your website</span>
          <BsFillArrowRightCircleFill className="rotate-90 md:rotate-0 text-2xl animate-pulse" />
        </div>
        <Link
          href="show/create/type"
          className="text-2xl p-10 uppercase lg:w-1/3"
        >
          Create
        </Link>
      </div>
      <div className="display bg-black h-1/3 md:h-full text-white flex flex-col justify-start md:flex-row md:items-center  w-full shadow-xl lg:w-1/2">
        <Link
          href="show/page"
          className="text-2xl bg-black/10 p-10 uppercase lg:w-1/3 "
        >
          See
        </Link>
        <div className="flex flex-1 flex-col md:flex-row md:gap-5 justify-start items-center">
          <BsFillArrowLeftCircleFill className="rotate-90 md:rotate-0 text-2xl animate-pulse" />
          <span>Click here to show your website</span>
        </div>
      </div>
    </main>
  );
}
