"use client";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  setTimeout(() => {
    router.push(`/show/page`);
  }, 10000);
  return (
    <div className="grid place-content-center h-screen">
      <div className="thanks  shadow-2xl shadow-black/50 p-10 rounded-xl text-center">
        <p className="text-2xl">Thank you for your purchase</p>
        <p className="font-thin text-slate-500/80 animate-pulse">
          redirect you to main page
        </p>
      </div>
    </div>
  );
}

export default page;
