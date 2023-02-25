import { DocumentIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction } from "react";

type props = {
  state: {
    name: string | "avatar";
    type: string;
  };
  setData: Dispatch<SetStateAction<{}>>;
  value?: string;
};
function Input({ state, setData, value }: props) {
  return (
    <label className="flex justify-between items-center gap-1 p-1 md:gap-5 md:p-3 ">
      {state.name}
      <input
        onChange={(e) =>
          setData(
            (prev) =>
              (prev = {
                ...prev,
                [e.target.name]:
                  state.name === "avatar" ? e.target.files![0] : e.target.value,
              })
          )
        }
        value={value}
        name={state.name}
        type={state.type}
        className={`border-b border-slate-400  rounded outline-none text-black  ${
          state.type === "file" && "hidden"
        }`}
      />
      {state.type === "file" && (
        <DocumentIcon className="w-10 h-10 hover:cursor-pointer text-white" />
      )}
    </label>
  );
}

export default Input;
