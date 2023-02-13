import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Session } from "next-auth";
import { uuidv4 } from "@firebase/util";
import { toast } from "react-hot-toast";

async function storePicture(data: object | any, session: Session | null) {
  const imageRef = ref(
    storage,
    `/images/${session?.user?.email!}/${data.name + uuidv4()}`
  );
  await uploadBytes(imageRef, data);
  const url = await getDownloadURL(imageRef);

  return url;
}
export default storePicture;
