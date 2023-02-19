import Footer from "@/components/Footer";
import Type from "@/components/Type/Type";

function page() {
  return (
    <div className="h-full flex flex-col backdrop-blur-md">
      <Type />
      <Footer prev={""} next={"pagename"} />
    </div>
  );
}

export default page;
