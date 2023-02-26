import ListItem from "@/components/Define/ListItem";
import Footer from "@/components/Footer";
import InfoComponents from "@/components/InfoComponents";
import Iframe from "react-iframe";
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col text-white">
      <InfoComponents
        prev={{ first: "layout", second: "page" }}
        now={{ first: "define", second: "page", step: 5 }}
        next={{ first: "PAGE", step: 6 }}
      />
      <div className="wrapper flex flex-col justify-center items-center sm:items-start sm:flex-row flex-1 p-5 rounded">
        <div className="layoutsList p-5">
          <ListItem />
        </div>
        <div className="flex-1 flex flex-col">
          {children}
          <div className="frame hidden sm:block sm:h-[300px] lg:min-h-screen">
            <Iframe
              url={`${process.env.HOST}/show/page`}
              width="100%"
              height="100%"
              className="rounded"
            />
          </div>
          <Footer prev={"layout"} next={"page"} />
        </div>
      </div>
    </div>
  );
}

export default layout;
