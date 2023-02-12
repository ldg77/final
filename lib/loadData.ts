"use client";
import { db } from "@/firebase";
import {
  collection,
  DocumentData,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";

function useLoadData(path: string): QuerySnapshot<DocumentData> | undefined {
  const { data: session } = useSession();

  const [firedata] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, path),
        orderBy("createdAt", "asc")
      )
  );

  return firedata;
}

export default useLoadData;
