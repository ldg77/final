import { Session } from "next-auth";

async function getSessionUser(session: Session | null) {
  const resUser = await fetch("/api/user/email", {
    method: "POST",
    body: JSON.stringify({
      email: session?.user?.email,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const user = await resUser.json();
  return user;
}

export default getSessionUser;
