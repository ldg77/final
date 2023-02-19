import ListItem from "@/components/Define/ListItem";
import Footer from "@/components/Footer";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="wrapper flex flex-1">
        <div className="layoutsList">
          <ListItem />
        </div>
        {children}
      </div>
      <Footer prev={"layout"} next={"define"} />
    </div>
  );
}

export default layout;
