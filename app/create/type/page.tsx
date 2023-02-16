import Footer from "@/components/Footer";
import Type from "@/components/Type/Type";

function page() {
  return (
    <div className="h-full flex flex-col">
      <Type />
      <Footer prev={"maincolors"} next={"layout"} />
    </div>
  );
}

export default page;
