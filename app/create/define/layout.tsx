import ListItem from "@/components/Define/ListItem";
import Footer from "@/components/Footer";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="layoutsList">
        <ListItem />
      </div>
      {children}
      <Footer prev={"layout"} next={"define"} />
    </div>
  );
}

export default layout;
