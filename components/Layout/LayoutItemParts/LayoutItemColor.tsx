"use client";

import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import LabelInputComponent from "./LabelInputComponent";

type Prop = {
  path: string;
};

function LayoutItemColor({ path }: Prop) {
  const INITIAL = {
    color: "#ffffff",
    backgroundColor: "#000000",
    fontSize: "",
    borderRadius: "",
    padding: "",
    marginBottom: "",
    marginTop: "",
    marginLeft: "",
    marginRight: "",
  };

  const { data: session } = useSession();
  const [data, setData] = useState(INITIAL);

  const modifyState = (obj: any) => {
    return Object.keys(obj).reduce((acc: any, el) => {
      acc[el] = parseFloat(obj[el]) == +obj[el] ? obj[el] + "em" : obj[el];
      return acc;
    }, {});
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const save = toast.loading("save your data....");
    const typeRes = await fetch(`/api/user/path/${session?.user?.email}/type`);
    const type = await typeRes.json();
    const updateTypeRes = await fetch(
      `/api/type/${type.data.type._id}/${path}`,
      {
        method: "PATCH",
        body: JSON.stringify(modifyState(data)),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const updateType = await updateTypeRes.json();
    console.log(updateType);

    setData(INITIAL);
    toast.success("saving done", { id: save });
  };
  return (
    <form action="" className=" p-5" onSubmit={async (e) => handleSubmit(e)}>
      <div className="inputs space-y-3 flex flex-col lg:flex-row lg:flex-wrap justify-between items-center p-1 md:gap-3 md:p-2 rounded font-light">
        <div className="colors lg:w-1/3">
          <p className="text-center">Colors</p>
          <LabelInputComponent
            data={data}
            handleChange={handleChange}
            name="color"
            type="color"
            value={data.color}
          />
          <LabelInputComponent
            data={data}
            handleChange={handleChange}
            name="backgroundColor"
            type="color"
            value={data.backgroundColor}
          />
        </div>
        <div className="sizes">
          <p className="text-center">Sizes</p>

          <LabelInputComponent
            data={data}
            handleChange={handleChange}
            name="padding"
            type="text"
            value={data.padding}
          />
          <LabelInputComponent
            data={data}
            handleChange={handleChange}
            name="fontSize"
            type="text"
            value={data.fontSize}
          />
          <LabelInputComponent
            data={data}
            handleChange={handleChange}
            name="borderRadius"
            type="text"
            value={data.borderRadius}
          />
        </div>
        <div className="margin">
          <p className="text-center">Margin</p>

          <LabelInputComponent
            data={data}
            handleChange={handleChange}
            name="marginBottom"
            type="text"
            value={data.marginBottom}
          />
          <LabelInputComponent
            data={data}
            handleChange={handleChange}
            name="marginTop"
            type="text"
            value={data.marginTop}
          />
          <LabelInputComponent
            data={data}
            handleChange={handleChange}
            name="marginLeft"
            type="text"
            value={data.marginLeft}
          />
          <LabelInputComponent
            data={data}
            handleChange={handleChange}
            name="marginRight"
            type="text"
            value={data.marginRight}
          />
        </div>
      </div>

      <div className="btn flex justify-center items-center w-full">
        <button className=" btn-form">
          {!Object.keys(data).findIndex((el) => (data as any)[el])
            ? "save"
            : "reset"}
        </button>
      </div>
    </form>
  );
}

export default LayoutItemColor;
