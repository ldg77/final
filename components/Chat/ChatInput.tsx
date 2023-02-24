"use client";

import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { BiSend } from "react-icons/bi";
import getSessionUser from "@/lib/getSessionUser";
import { toast } from "react-hot-toast";

function ChatInput() {
  const INITIAL = { question: "" };
  const { data: session } = useSession();
  const [formData, setFormData] = useState(INITIAL);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const send = toast.loading("chat is thinking....");
    const user = await getSessionUser(session);
    await fetch(`/api/chat/message/${user.chat}`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    toast.success("messege recived", { id: send });
    setFormData(INITIAL);
  };

  return (
    <div className="bg-slate-900 text-white py-5 flex">
      <form onSubmit={handleSubmit} className="lg:w-1/2 mx-auto flex gap-2">
        <input
          type="text"
          name="question"
          className="flex-1  bg-inherit border-b-[.5px] outline-none px-1 focus:border-b-green-800"
          placeholder="<Your Question>"
          value={formData.question}
          onChange={handleChange}
        />
        <button>
          <BiSend className="-rotate-45 text-2xl hover:animate-pulse" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
