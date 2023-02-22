import Footer from "@/components/Footer";
import MainColor from "./MainColor";

function page() {
  return (
    <div className="h-full flex flex-col backdrop-blur-md">
      {/* @ts-ignore */}
      <MainColor />
      <Footer prev={"pagename"} next={"layout"} />
    </div>
  );
}

export default page;
