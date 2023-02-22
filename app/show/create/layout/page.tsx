import LayoutComponent from "./LayoutComponent";

async function page() {
  return (
    <div className="h-full flex flex-col backdrop-blur-md">
      {/* @ts-ignore */}
      <LayoutComponent />
    </div>
  );
}

export default page;
