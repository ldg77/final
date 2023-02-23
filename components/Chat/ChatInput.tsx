"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { BiSend } from "react-icons/bi";

function ChatInput() {
  const INITIAL = { question: "" };
  const [formData, setFormData] = useState(INITIAL);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
