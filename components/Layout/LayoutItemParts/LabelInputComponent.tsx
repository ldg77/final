import React, { Dispatch, SetStateAction } from "react";
type Prop = {
  value: string;
  handleChange: Dispatch<SetStateAction<any>>;
  data: any;
  type: string;
  name: string;
};
function LabelInputComponent({ value, handleChange, data, type, name }: Prop) {
  return (
    <label className="flex justify-between items-center gap-1 p-1 md:gap-5 md:p-3 ">
      {name}
      <input
        type={type}
        value={data[name]}
        onChange={handleChange}
        name={name}
        className="rounded  text-black lg:w-1/4"
      />
    </label>
  );
}

export default LabelInputComponent;
