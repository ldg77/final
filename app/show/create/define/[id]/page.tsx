import LayoutItemColor from "@/components/Layout/LayoutItemParts/LayoutItemColor";
import AddItem from "@/components/Shop/AddItem";

type Props = {
  params: {
    id: string;
  };
};

function page({ params: { id } }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center">
      <p className="text-center p-5 uppercase text-2xl font-extrabold">
        define properties for layout item:{" "}
        <span className="font-mono">{id}</span>
      </p>
      <LayoutItemColor path={id} />
      {id === "shopmain" && <AddItem />}
    </div>
  );
}

export default page;
