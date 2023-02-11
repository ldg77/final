import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Session } from "next-auth";
import { uuidv4 } from "@firebase/util";
import { toast } from "react-hot-toast";

async function storeData(
  userpath: string,
  data: object | any,
  session: Session | null
) {
  if (!data.avatar) {
    await addDoc(collection(db, "users", session?.user?.email!, userpath), {
      data: data,
      createdAt: serverTimestamp(),
    });
  } else {
    const imageRef = ref(
      storage,
      `/images/${session?.user?.email!}/${data.avatar.name + uuidv4()}`
    );
    const info = toast.loading(
      `${session?.user?.name} we upload the file in ${userpath}`
    );
    await uploadBytes(imageRef, data.avatar);
    const url = await getDownloadURL(imageRef);
    await addDoc(collection(db, "users", session?.user?.email!, userpath), {
      data: { ...data, avatar: url },
      createdAt: serverTimestamp(),
    });
    toast.success("Upload done!", { id: info });
  }
}
export default storeData;
