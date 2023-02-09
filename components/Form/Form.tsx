"use client";

import storeData from "@/lib/storeData";

import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import Input from "./Input";

type params = {
  formInfo: {
    fields: object;
    userpath: string;
    slogan: string;
  };
};

function Form(props: params) {
  const { data: session } = useSession();
  const { fields, userpath, slogan } = props.formInfo;
  type T = keyof typeof fields;
  const [data, setData] = useState(
    Object.keys(fields).reduce((acc, el) => {
      acc[el] = "";
      return acc;
    }, {})
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await storeData(userpath, data, session);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="p-3">
        <p>Please select {slogan}</p>
      </div>
      <form
        className="shadow space-y-3 flex flex-col gap-3 p-2 rounded"
        onSubmit={handleSubmit}
      >
        {Object.keys(fields).map((el) => (
          <Input
            key={el}
            data={{ name: el, type: fields[el] }}
            setData={setData}
          />
        ))}
        <button className="border w-1/3 mx-auto p-3 bg-slate-700 text-white rounded-xl uppercase transition hover:opacity-50 hover:scale-95 hover:translate-y-1">
          save
        </button>
      </form>
    </div>
  );
}

export default Form;
