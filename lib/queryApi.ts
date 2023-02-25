import openai from "./chatgpt";

const query = async (prompt: string, chatId: string | null) => {
  const res = await openai
    .createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.1,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text)
    .catch((err) => `Sorry but no Message avaible :(. Error: ${err.error}`);

  return res;
};

export default query;
