"use client";
import useLoadData from "@/lib/loadData";
import { Session } from "next-auth";

type Prop = {
  id: string;
  session: Session | null;
  handleLoad: () => void;
};

function LayoutItem({ id, session, handleLoad }: Prop) {
  const data = useLoadData("layout");
  const handleDelete = () => {
    const dataParsed = data?.docs[data?.docs.length - 1].data().data;
    const filteredData = Object.keys(dataParsed).reduce((acc: any, el) => {
      acc[el] = dataParsed[el].filter((item: any) => item.i !== id);
      return acc;
    }, {});

    handleLoad();
  };

  return (
    <div className="w-full grid place-content-center">
      <p className="hover:cursor-pointer">Dubble - Click me to edit</p>
    </div>
  );
}

export default LayoutItem;
