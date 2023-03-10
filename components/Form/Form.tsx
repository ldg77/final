"use client";

import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import Input from "./Input";
import { toast } from "react-hot-toast";

import CustomToast from "../CustomToast";
import storePicture from "@/lib/storePicture";
import getSessionUser from "@/lib/getSessionUser";

type params = {
  formInfo: {
    fields: object;
    userpath: string;
    slogan: string | null;
    options?: any;
    dispatch?: React.Dispatch<React.SetStateAction<boolean>>;
    position?: string;
    color?: string;
  };
};

function Form(props: params) {
  const { data: session } = useSession();
  const { fields, userpath, slogan, options, dispatch, position, color } =
    props.formInfo;
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

    let user = await getSessionUser(session);
    if (!user) {
      user = await fetch(`/api/user/handler`, {
        method: "POST",
        body: JSON.stringify({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    }
    await fetch(`/api/${userpath}/handler`, {
      method: "POST",
      body: JSON.stringify({
        ...data,
        avatar: url,
        user: user._id,
        ...options,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    toast.success("allready stored", { id: notification });
    setData(INITIAL);

    dispatch && dispatch((prev: boolean) => (prev = !prev));
  };

  return (
    <div
      className={`flex flex-col items-${position} md:gap-6 bg-inherit lg:p-5`}
    >
      <div className="p-3 font-extrabold">
        <p className="text-2xl uppercase">{slogan}</p>
      </div>
      <form
        className={`space-y-3  shadow-2xl shadow-black flex flex-col p-1 md:gap-3 md:p-2 rounded max-w-lg text-${color}-700`}
        onSubmit={handleSubmit}
      >
        {Object.keys(fields).map((el) =>
          (fields as any)[el] === "textarea" ? (
            <textarea
              key={el}
              name={el}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              placeholder={el}
              className="outline-none rounded resize-none px-1 text-black"
              value={data[el]}
            />
          ) : el !== "avatar" ? (
            <Input
              key={el}
              state={{ name: el, type: (fields as any)[el] }}
              setData={setData}
              value={data[el]}
            />
          ) : (
            <Input
              key={el}
              state={{ name: el, type: (fields as any)[el] }}
              setData={setData}
            />
          )
        )}
        <button className="btn-form w-max mx-auto">save</button>
      </form>
    </div>
  );
}

export default Form;
