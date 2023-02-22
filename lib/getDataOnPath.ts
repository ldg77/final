import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function getDataonPath(path: string) {
  const session = await getServerSession(authOptions);
  const dataRes = await fetch(
    `${process.env.HOST}/api/user/path/${session?.user?.email!}/${path}`,
    { next: { revalidate: 60 } }
  );
  const data = await dataRes.json();
  return data;
}
