import { Session } from "next-auth";

async function getSessionUser(session: Session | null) {
  const resUser = await fetch(`/api/user/email/` + session?.user?.email!);
  const user = await resUser.json();

  return user;
}

export default getSessionUser;
