"use client";
import useLoadData from "@/lib/loadData";
import storeData from "@/lib/storeData";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Session } from "next-auth";

type Prop = {
  id: string;
  session: Session | null;
};

function LayoutItem({ id, session }: Prop) {
  const data = useLoadData("layout");
  const handleDelete = () => {
    console.log("bin da ");
    const dataParsed = JSON.parse(
      data?.docs[data?.docs.length - 1].data().data
    );
    console.log(dataParsed);

    const filteredData = Object.keys(dataParsed).reduce((acc: any, el) => {
      acc[el] = dataParsed[el].filter((item: any) => item.i !== id);
      return acc;
    }, {});
    console.log(filteredData);
    storeData("layout", filteredData, session);
  };
  return (
    <div className="relative w-full">
      <button className="delete flex w-full justify-end" onClick={handleDelete}>
        <XCircleIcon className="w-6 h-6 text-slate-500/80 hover:opacity-50 transition" />
      </button>
    </div>
  );
}

export default LayoutItem;
