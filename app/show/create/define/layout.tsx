import ListItem from "@/components/Define/ListItem";
import Footer from "@/components/Footer";
import Iframe from "react-iframe";
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="wrapper flex flex-1">
        <div className="layoutsList">
          <ListItem />
        </div>
        {children}
        <div className="frame">
          <Iframe
            url="http://localhost:3000/show/page"
            width="640px"
            height="320px"
          />
        </div>
      </div>
      <Footer prev={"layout"} next={"define"} />
    </div>
  );
}

export default layout;