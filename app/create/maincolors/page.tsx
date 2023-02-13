import Footer from "@/components/Footer";
import MainColor from "@/components/MainColors/MainColor";

function page() {
  return (
    <div className="h-full flex flex-col">
      <MainColor />
      <Footer prev={"home"} next={"layout"} />
    </div>
  );
}

export default page;
