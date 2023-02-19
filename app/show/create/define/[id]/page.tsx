"use client";
import LayoutItemColor from "@/components/Layout/LayoutItemParts/LayoutItemColor";

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
    </div>
  );
}

export default page;
