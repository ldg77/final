"use client";

import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import Input from "./Input";
import { toast } from "react-hot-toast";

import CustomToast from "../CustomToast";
import storePicture from "@/lib/storePicture";
import User from "@/model/User";
import { log } from "console";

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

  const INITIAL = Object.keys(fields).reduce((acc: any, el) => {
    acc[el] = "";
    return acc;
  }, {});
  const [data, setData] = useState(INITIAL);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const notification = CustomToast({
      url: session?.user?.image!,
      name: session?.user?.name!,
      text: "save data...",
    });
    let url = "";
    if (data.avatar) {
      url = await storePicture(data.avatar, session);
    }

    const resUser = await fetch("/api/user/email", {
      method: "POST",
      body: JSON.stringify({
        email: session?.user?.email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const user = await resUser.json();

    await fetch(`/api/${userpath}/handler`, {
      method: "POST",
      body: JSON.stringify({
        ...data,
        avatar: url,
        user: user._id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    toast.success("allready stored", { id: notification });
    setData(INITIAL);
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
            state={{ name: el, type: (fields as any)[el] }}
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
