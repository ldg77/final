import Footer from "@/components/Footer";
import MainColor from "@/components/MainColors/MainColor";

function page() {
  return (
    <div className="h-full flex flex-col backdrop-blur-md">
      <MainColor />
      <Footer prev={"pagename"} next={"layout"} />
    </div>
  );
}

export default page;
