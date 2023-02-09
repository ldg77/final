import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Session } from "next-auth";

async function storeData(
  userpath: string,
  data: object,
  session: Session | null
) {
  const doc = await addDoc(
    collection(db, "users", session?.user?.email!, userpath),
    {
      data: data,
      createdAt: serverTimestamp(),
    }
  );

  return doc;
}
export default storeData;
