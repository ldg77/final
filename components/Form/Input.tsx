import { DocumentIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction } from "react";

type props = {
  data: {
    name: string | "avatar";
    type: string;
  };
  setData: Dispatch<SetStateAction<{}>>;
};
function Input({ data, setData }: props) {
  return (
    <label className="flex justify-between items-center gap-5 p-3">
      {data.name}
      <input
        onChange={(e) =>
          setData(
            (prev) =>
              (prev = {
                ...prev,
                [e.target.name]:
                  data.name === "avatar" ? e.target.files[0] : e.target.value,
              })
          )
        }
        name={data.name}
        type={data.type}
        className={`border-b border-slate-400 ${
          data.type === "file" && "hidden"
        }`}
      />
      {data.type === "file" && (
        <DocumentIcon className="w-10 h-10 hover:cursor-pointer" />
      )}
    </label>
  );
}

export default Input;
