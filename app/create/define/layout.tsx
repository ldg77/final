import ListItem from "@/components/Define/ListItem";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="layoutsList">
        <ListItem />
      </div>
      {children}
    </div>
  );
}

export default layout;
