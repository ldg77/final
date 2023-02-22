"use client";
import getSessionUser from "@/lib/getSessionUser";
import { useSession } from "next-auth/react";
import React from "react";
import { toast } from "react-hot-toast";

type Prop = {
  selected: string;
};

function SelectedType({ selected }: Prop) {
  const { data: session } = useSession();
  const items: any = {
    blog: ["avatar", "pagename", "slogan", "blogpart", "footer", "copyright"],
    shop: [
      "avatar",
      "pagename",
      "slogan",
      "shopmain",
      "userinfo",
      "footer",
      "copyright",
    ],
  };

  const handleSelect = async (str: string) => {
    const modified = items[str].reduce((acc: any, el: string) => {
      acc[el] = { name: el };
      return acc;
    }, {});

    const user = await getSessionUser(session);
    const res = await fetch("/api/type/handler", {
      method: "POST",
      body: JSON.stringify({
        name: str,
        layoutitem: modified,
        user: user._id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    if (data.approved) {
      toast.success(`${str} stored`, { duration: 1000 });
    } else {
      toast.error(`${str} not stored`, { duration: 1000 });
    }
  };
  return (
    <div>
      <button
        className={`blog p-10 bg-[#555] text-white transition `}
        onClick={() => {
          handleSelect(selected);
          toast.success(`selected ${selected}`, { duration: 1000 });
        }}
      >
        {selected}
      </button>
    </div>
  );
}

export default SelectedType;
