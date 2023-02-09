"use client";

import { db } from "@/firebase";

import {
  collection,
  query,
  orderBy,
  DocumentData,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";

function DisplayTodos() {
  const { data: session } = useSession();
  const [value, loading, error] = useCollection(
    query(
      collection(db, "users", session?.user?.email!, "todos"),
      orderBy("createdAt", "desc")
    )
  );

  return (
    <div className="flex-1">
      {value?.docs.map((el: DocumentData) => {
        return (
          <div className="flex gap-3 justify-center items-center" key={el.id}>
            <button
              className="border p-1 rounded bg-slate-500 text-white hover:opacity-50 transition"
              onClick={async () =>
                await deleteDoc(
                  doc(db, "users", session?.user?.email!, "todos", el.id)
                )
              }
            >
              delete todo
            </button>
            <p
              className={`${
                el.data().done ? "bg-green-800" : "bg-red-800 text-white"
              } p-1 rounded`}
            >
              {el.data().todo}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default DisplayTodos;
