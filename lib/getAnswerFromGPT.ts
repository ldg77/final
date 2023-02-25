async function getAnswerFromGPT(what: string, person: string) {
  const res = await fetch(`/api/chat/message/getOne`, {
    method: "POST",
    body: JSON.stringify({
      question: `Hi, my Name is ${person},I need a new ${what}`,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await res.text();
}

export default getAnswerFromGPT;
