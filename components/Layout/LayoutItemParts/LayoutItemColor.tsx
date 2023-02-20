"use client";

import Input from "@/components/Form/Input";
import getLayout from "@/lib/getLayout";
import updateLayoutItem from "@/lib/updateLayoutItem";
import { useSession } from "next-auth/react";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";

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
  };
  return (
    <form
      action=""
      className="flex flex-col justify-center items-center w-1/2 mx-auto gap-3"
      onSubmit={async (e) => handleSubmit(e)}
    >
      <label className="flex  justify-between w-full">
        color
        <input
          type="color"
          value={data.color}
          onChange={handleChange}
          name="color"
          className="rounded"
        />
      </label>
      <label className="flex  justify-between w-full">
        background
        <input
          type="color"
          value={data.backgroundColor}
          onChange={handleChange}
          name="backgroundColor"
          className="rounded"
        />
      </label>
      <label className="flex  justify-between w-full">
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
      <button className=" border shadow-2xl px-5 py-2 rounded-lg bg-slate-800 text-white hover:scale-95 transition">
        {data.color || data.backgroundColor ? "save" : "reset"}
      </button>
    </form>
  );
}

export default LayoutItemColor;
