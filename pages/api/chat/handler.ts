import connectMongo from "@/lib/dbConnect";
import * as chat from "@/model/Chat";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  switch (req.method) {
    case "GET":
      return res.status(200).json(chat.getAll());
    default:
      break;
  }
};
export default handler;
