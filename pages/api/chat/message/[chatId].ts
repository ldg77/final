import connectMongo from "@/lib/dbConnect";
import query from "@/lib/queryApi";
import * as chat from "@/model/Chat";

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { chatId } = req.query;

  const ressponse = await query(req.body.question, chatId as string);

  switch (req.method) {
    case "POST":
      return res.status(200).json(
        await chat.pushOneMessage(chatId as string, {
          question: req.body.question,
          answer: ressponse,
        })
      );
    default:
      break;
  }
};
export default handler;
