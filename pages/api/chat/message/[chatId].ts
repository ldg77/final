import connectMongo from "@/lib/dbConnect";
import * as chat from "@/model/Chat";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { chatId } = req.query;
  switch (req.method) {
    case "POST":
      return res
        .status(200)
        .json(await chat.pushOneMessage(chatId as string, req.body));
    default:
      break;
  }
};
export default handler;
