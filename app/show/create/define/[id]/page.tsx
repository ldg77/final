"use client";
import LayoutItemColor from "@/components/Layout/LayoutItemParts/LayoutItemColor";
import AddItem from "@/components/Shop/AddItem";

type Props = {
  params: {
    id: string;
  };
};

function page({ params: { id } }: Props) {
  return (
    <div className="flex-1">
      <p className="text-center p-5 font-extrabold">
        define properties for layout item: {id}
      </p>
      <LayoutItemColor path={id} />
      {id === "shopmain" && <AddItem />}
    </div>
  );
}

export default page;
