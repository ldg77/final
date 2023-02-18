import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row justify-center items-center h-screen text-center lg:w-2/3 lg:mx-auto lg">
      <div className="create h-1/3 md:h-full flex flex-col md:flex-row md:items-center w-full shadow">
        <div className="">Click here to build your Website </div>
        <Link href="/create" className="text-2xl p-10  uppercase">
          Create
        </Link>
      </div>
      <div className="display bg-black h-1/3 md:h-full text-white flex flex-col md:flex-row justify-end md:items-center  w-full gap-1 shadow-xl">
        <Link href="/page" className="text-2xl  bg-black/10 p-10  uppercase">
          See
        </Link>
        <div>Click hete to see your Website</div>
      </div>
    </main>
  );
}
