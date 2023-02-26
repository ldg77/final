"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { toast } from "react-hot-toast";

type Prop = {
  path: string;
  submit: string;
};

function ClearButtonOnPath({ path, submit }: Prop) {
  const { data: session } = useSession();

  const clearItems = async () => {
    const clean = toast.loading("it is cleened");
    await fetch(`/api/user/path/${session?.user?.email}/${path}`, {
      method: "PATCH",
    });
    toast.success("has been cleaned", { id: clean });
  };
  return (
    <button
      onClick={clearItems}
      className=" w-1/3 mx-auto p-3 bg-black border border-b-white text-white rounded-xl uppercase transition hover:opacity-50 hover:scale-95 hover:translate-y-1"
    >
      {submit}
    </button>
  );
}

export default ClearButtonOnPath;
