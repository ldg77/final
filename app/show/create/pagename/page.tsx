import Footer from "@/components/Footer";
import Pagename from "./Pagename";

function page() {
  return (
    <div className="h-full flex flex-col backdrop-blur-md">
      {/* @ts-ignore */}
      <Pagename />
      <Footer prev={"type"} next={"maincolors"} />
    </div>
  );
}

export default page;
