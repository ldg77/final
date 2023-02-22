"use client";

import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";

type Prop = {
  path: string;
};

function LayoutItemColor({ path }: Prop) {
  const INITIAL = {
    color: "",
    backgroundColor: "",
    fontSize: "",
    borderRadius: "",
  };

  const { data: session } = useSession();
  const [data, setData] = useState(INITIAL);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const typeRes = await fetch(`/api/user/path/${session?.user?.email}/type`);
    const type = await typeRes.json();
    console.log(type.data.type._id);
    console.log(path);
    const updateTypeRes = await fetch(
      `/api/type/${type.data.type._id}/${path}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const updateType = await updateTypeRes.json();

    console.log(updateType);

    setData(INITIAL);
  };
  return (
    <form
      action=""
      className="space-y-3 flex flex-col p-1 md:gap-3 md:p-2 rounded max-w-lg "
      onSubmit={async (e) => handleSubmit(e)}
    >
      <label className="flex justify-between items-center gap-1 p-1 md:gap-5 md:p-3 ">
        color
        <input
          type="color"
          value={data.color}
          onChange={handleChange}
          name="color"
          className="rounded"
        />
      </label>
      <label className="flex justify-between items-center gap-1 p-1 md:gap-5 md:p-3 ">
        background
        <input
          type="color"
          value={data.backgroundColor}
          onChange={handleChange}
          name="backgroundColor"
          className="rounded"
        />
      </label>
      <label className="flex justify-between items-center gap-1 p-1 md:gap-5 md:p-3 ">
        fontsize
        <input
          type="number"
          min={1}
          value={data.fontSize}
          onChange={handleChange}
          name="fontSize"
          className="rounded outline none"
        />
      </label>
      <button className=" w-1/3 mx-auto p-3 bg-black border border-b-white text-white rounded-xl uppercase transition hover:opacity-50 hover:scale-95 hover:translate-y-1">
        {data.color || data.backgroundColor ? "save" : "reset"}
      </button>
    </form>
  );
}

export default LayoutItemColor;
