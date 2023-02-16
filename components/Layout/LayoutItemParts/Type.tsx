import getLayout from "@/lib/getLayout";
import updateLayoutItem from "@/lib/updateLayoutItem";

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
    const updatedLayout = await updateLayoutItem(
      data.id,
      "layouts",
      "type",
      e.target.value,
      session?.user?.email!
    );
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
