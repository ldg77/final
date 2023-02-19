import ListItem from "@/components/Define/ListItem";
import Footer from "@/components/Footer";
import Iframe from "react-iframe";
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col backdrop-blur-md text-white">
      <div className="wrapper flex flex-col sm:flex-row flex-1 p-5 rounded">
        <div className="layoutsList p-5">
          <ListItem />
        </div>
        {children}
        <div className="frame flex-1 p-5">
          <Iframe
            url="http://localhost:3000/show/page"
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <Footer prev={"layout"} next={"define"} />
    </div>
  );
}

export default layout;
