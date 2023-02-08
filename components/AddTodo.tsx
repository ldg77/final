"use client";

import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

function AddTodo() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addDoc(collection(db, "users", session?.user?.email!, "todos"), {
      todo: formData,
      createdAt: serverTimestamp(),
      done: true,
    });
    setFormData("");
  };
  return (
    <form
      className="w-full bg-slate-700/50 p-5 flex justify-center items-center gap-3"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="outline-none p-3 rounded"
        placeholder="please type new todo..."
        onChange={(e) => {
          setFormData((prev) => (prev = e.target.value));
        }}
        value={formData}
      />
      <button className="bg-slate-700 p-3 rounded text-white">save</button>
    </form>
  );
}

export default AddTodo;
