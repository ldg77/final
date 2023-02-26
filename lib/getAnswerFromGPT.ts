import { Session } from "next-auth";

async function getAnswerFromGPT(what: string, session: Session | null) {
  const typeRes = await fetch(`/api/user/path/${session?.user?.email}/type`);
  const type = await typeRes.json();
  const res = await fetch(`/api/chat/message/getOne`, {
    method: "POST",
    body: JSON.stringify({
      question: `Hi, my Name is ${session?.user
        ?.name!},I need a new ${what} form my new ${type.data.type.name}`,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await res.json();
}

export default getAnswerFromGPT;
