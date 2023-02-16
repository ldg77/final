import getLayout from "@/lib/getLayout";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { ChangeEvent } from "react";

type Prop = {
  data: {
    options: {
      unique: string[];
      unlimited: string;
    };
    id: string;
  };
};

function Type({ data }: Prop) {
  const { data: session } = useSession();

  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const resLayout = await getLayout(session?.user?.email!);
    const updatedLayout = Object.keys(resLayout.data.layouts).reduce(
      (acc: any, el) => {
        acc[el] = resLayout.layouts[el].map((item: any) =>
          item.i === data.id ? { ...item, type: e.target.value } : { ...item }
        );
        return acc;
      },
      {}
    );
    const text = await fetch("/api/layout/" + resLayout._id, {
      method: "PUT",
      body: JSON.stringify({ ...resLayout[0], layouts: updatedLayout }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  const options = [
    "Choose type",
    ...data.options.unique,
    data.options.unlimited,
  ];
  return (
    <>
      <p>Choose type of layout Item </p>
      <select
        name="type"
        onChange={handleChange}
        className="w-full outline-none"
      >
        {options.map((el) => (
          <option key={el + data.id} value={el} className="capitalize w-full">
            {el}
          </option>
        ))}
      </select>
    </>
  );
}

export default Type;
