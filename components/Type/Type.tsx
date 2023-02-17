"use client";

import getSessionUser from "@/lib/getSessionUser";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

function Type() {
  const [choosen, setChoosen] = useState({ blog: false, shop: false });
  const { data: session } = useSession();
  const items: any = {
    blog: ["avatar", "pagename", "slogan", "footer", "copyright", "main"],
    shop: [
      "avatar",
      "pagename",
      "slogan",
      "footer",
      "copyright",
      "main",
      "shopcard",
    ],
  };

  const handleSelect = async (str: string) => {
    const user = await getSessionUser(session);
    const res = await fetch("/api/type/handler", {
      method: "POST",
      body: JSON.stringify({
        name: str,
        layoutitem: items[str],
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
    <div className="flex-1 flex flex-col md:flex-row justify-center items-center gap-3">
      <button
        className={`blog p-10 bg-black text-white transition ${
          choosen.blog && "button-active"
        } ${choosen.shop && "button-nonactive"} `}
        onClick={() => {
          setChoosen({ blog: true, shop: false });
          handleSelect("blog");
          toast.success("selected blog", { duration: 1000 });
        }}
      >
        blog
      </button>
      <button
        className={`shop blog p-10 bg-black text-white transition ${
          choosen.shop && "button-active"
        } ${choosen.blog && "button-nonactive"} `}
        onClick={() => {
          setChoosen({ blog: false, shop: true });
          handleSelect("shop");
          toast.success("selected shop", { duration: 1000 });
        }}
      >
        shop
      </button>
    </div>
  );
}

export default Type;
