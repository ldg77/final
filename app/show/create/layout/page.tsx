import LayoutComponent from "./LayoutComponent";

async function page() {
  return (
    <div className="h-full flex flex-col ">
      {/* @ts-ignore */}
      <LayoutComponent />
    </div>
  );
}

export default page;
