import connectMongo from "@/lib/dbConnect";
import * as comment from "@/model/Comment";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  switch (req.method) {
    case "GET":
      res.status(200).json(await comment.getAll());
      break;

    case "POST":
      res.status(200).json(await comment.createOne(req.body));
      break;

    default:
      break;
  }
};
export default handler;
