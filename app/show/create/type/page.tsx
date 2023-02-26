import Footer from "@/components/Footer";
import Type from "./Type";

function page() {
  return (
    <div className=" flex-1 flex flex-col backdrop-blur-md">
      {/* @ts-ignore */}
      <Type />
      <Footer prev={""} next={"pagename"} />
    </div>
  );
}

export default page;
