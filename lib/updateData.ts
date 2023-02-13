import { db } from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Session } from "next-auth";

async function updateData(
  data: object | any,
  session: Session | null,
  path: string
) {
  const q = query(
    collection(db, `users/${session?.user?.email}/${path}`),
    orderBy("createdAt", "desc")
  );
  const querySnapShot = await getDocs(q);
  console.log(querySnapShot.docs[0].data().data);

  //   await addDoc(collection(db, "users", session?.user?.email!, path), {
  //     data: {},
  //     createdAt: serverTimestamp(),
  //   });

  return;
}

export default updateData;
