import Footer from "@/components/Footer";
import LayoutComponent from "./LayoutComponent";

async function page() {
  return (
    <div className="h-full flex flex-col ">
      <div className="description text-white text-center py-5 text-2xl uppercase font-extrabold">
        Step 4 / 5 : Define your layout
      </div>
      {/* @ts-ignore */}
      <LayoutComponent />
      <Footer prev={"maincolors"} next={"define"} />
    </div>
  );
}

export default page;
