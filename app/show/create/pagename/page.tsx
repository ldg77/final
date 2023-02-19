import Footer from "@/components/Footer";
import Pagename from "@/components/Pagename/Pagename";

function page() {
  return (
    <div className="h-full flex flex-col backdrop-blur-md">
      <Pagename />
      <Footer prev={"type"} next={"maincolors"} />
    </div>
  );
}

export default page;
