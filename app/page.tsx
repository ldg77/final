import Link from "next/link";
import {
  BsFacebook,
  BsLinkedin,
  BsGithub,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
export default async function Home() {
  return (
    <main className="h-screen">
      <div className="page landing w-full h-full relative">
        <Link href={"http://gurduza.de"}>
          <div className="logo absolute top-8 left-16 w-24 aspect-square logo rounded"></div>
        </Link>
        <div className="slogan absolute left-16 bottom-1/4 text-white flex flex-col gap-10">
          <div>
            <p className="text-4xl md:text-8xl">Make your ideas </p>
            <p className="text-4xl md:text-8xl">comes to life</p>
          </div>
          <p className="text-2xl md:text-4xl text-slate-100/50">
            My website build Your website
          </p>
        </div>
        <div className="meta absolute bottom-14 text-white w-full flex justify-center items-center text-2xl md:text-4xl ">
          <Link href="/show" className="flex justify-center items-center gap-5">
            <BsFillArrowRightCircleFill className="animate-pulse" />
            <p>Meta_Manager</p>
          </Link>
        </div>
        <div className="social absolute bottom-6 text-white w-full text-xl  flex gap-5 justify-center items-center">
          <Link
            href={"https://www.facebook.com/dumitru.gurduza"}
            target={"_blank"}
          >
            <BsFacebook />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/dumitru-gurduza-215a94a5/"}
            target={"_blank"}
          >
            <BsLinkedin />
          </Link>
          <Link href={"https://github.com/ldg77"} target={"_blank"}>
            <BsGithub />
          </Link>
        </div>
      </div>
    </main>
  );
}
