"use clinet";
import getSessionUser from "@/lib/getSessionUser";
import useLoadData from "@/lib/loadData";

import { XCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

type Prop = {
  id: string;
  setShowEdit: Dispatch<
    SetStateAction<{
      show: boolean;
      id: string;
    }>
  >;
};

function LayoutItemInfo({ id, setShowEdit }: Prop) {
  const layout = useLoadData("layout");
  const { data: session } = useSession();

  const handleDelete = async () => {
    const user = await getSessionUser(session);

    const layoutRes = await fetch("/api/layout/" + user.layout);
    const layoutData = await layoutRes.json();

    const filtered = Object.keys(layoutData.layouts).reduce((acc: any, el) => {
      acc[el] = layoutData.layouts[el].filter((item: any) => item.i !== id);
      return acc;
    }, {});

    await fetch("/api/layout/handler", {
      method: "POST",
      body: JSON.stringify({ layouts: filtered, user: user._id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    setShowEdit((prev) => (prev = { id: "", show: false }));
  };
  return (
    <div className="absolute inset-0 md:inset-16 bg-stone-400 z-20  flex flex-col">
      <button
        className="delete flex w-full justify-end"
        onClick={() => setShowEdit((prev) => (prev = { ...prev, show: false }))}
      >
        <XCircleIcon className="w-6 h-6 text-slate-500/80 hover:opacity-50 transition" />
      </button>
      <div className="main flex-1"></div>
      <div className="footer p-3 flex justify-end">
        <button
          className="border px-3 py-1 rounded bg-red-700 text-white capitalize"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default LayoutItemInfo;
