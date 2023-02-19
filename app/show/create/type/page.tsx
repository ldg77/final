import Footer from "@/components/Footer";
import Type from "@/components/Type/Type";

function page() {
  return (
    <div className="h-full flex flex-col">
      <Type />
      <Footer prev={""} next={"pagename"} />
    </div>
  );
}

export default page;
