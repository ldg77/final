import ListItem from "@/components/Define/ListItem";
import Footer from "@/components/Footer";
import Iframe from "react-iframe";
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col backdrop-blur-md text-white">
      <p className="text-center p-3 ">Step 5 / 5 : Define every layout item </p>
      <div className="wrapper flex flex-col sm:flex-row flex-1 p-5 rounded">
        <div className="layoutsList p-5">
          <ListItem />
        </div>
        <div className="flex-1 flex flex-col">
          {children}
          <div className="frame flex-1">
            <Iframe
              url="http://localhost:3000/show/page"
              width="100%"
              height="100%"
              className="rounded"
            />
          </div>
        </div>
      </div>
      <Footer prev={"layout"} next={"page"} />
    </div>
  );
}

export default layout;
