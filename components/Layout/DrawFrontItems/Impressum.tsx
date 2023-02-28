import {
  ClockIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { Dispatch, SetStateAction } from "react";
type Prop = {
  data: string;
  setImpressum: Dispatch<
    SetStateAction<{
      show: boolean;
      data: string;
    }>
  >;
};
function Impressum({ data, setImpressum }: Prop) {
  return (
    <div className="absolute top-5 left-1/2 -translate-x-1/2 max-w-2xl border z-10 bg-slate-50 text-black/80 p-5 rounded shadow-lg shadow-black text-lg">
      <button
        className="absolute top-0 right-0"
        onClick={() => setImpressum({ show: false, data: "" })}
      >
        <XMarkIcon className="w-6" />
      </button>
      Impressum
      <p>{data}</p>
    </div>
  );
}

export default Impressum;
