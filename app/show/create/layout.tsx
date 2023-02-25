import Nav from "@/app/show/create/Nav";
import { ArrowLongUpIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <>
        <Nav />
        <div className="flex-1 landing-bg relative">
          <ArrowUpIcon className="w-12  text-white/30 absolute top-3 right-14 z-10 animate-bounce" />
          {children}
        </div>
      </>
    </div>
  );
}
