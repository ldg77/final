import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row justify-center items-center h-screen text-center lg:w-2/3 lg:mx-auto lg">
      <Link href="/show">go</Link>
    </main>
  );
}
