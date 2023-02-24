import connectMongo from "@/lib/dbConnect";
import * as comment from "@/model/Comment";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      res.status(200).json(await comment.getOne(id as string));
      break;

    default:
      break;
  }
};
export default handler;
