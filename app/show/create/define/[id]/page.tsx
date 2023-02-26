import ClearButtonOnPath from "@/components/ClearButtonOnPath";
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
        define properties for layout item :{" "}
        <span className="font-mono">{id}</span>
      </p>
      <p className="font-extralight">
        sizes are in rem. 1rem = 16px = normalsize
      </p>
      <LayoutItemColor path={id} />
      {id === "shopmain" && <AddItem />}
      {id === "blogpart" && (
        <ClearButtonOnPath path="blog" submit="clear content" />
      )}
    </div>
  );
}

export default page;
