import Footer from "@/components/Footer";
import Pagename from "@/components/Pagename/Pagename";

function page() {
  return (
    <div className="h-full flex flex-col">
      <Pagename />
      <Footer prev={""} next={"maincolors"} />
    </div>
  );
}

export default page;
