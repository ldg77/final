import connectMongo from "@/lib/dbConnect";
import * as blog from "@/model/Blog";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  switch (req.method) {
    case "GET":
      res.status(200).json(await blog.getAll());
      break;
    case "POST":
      res.status(200).json(await blog.createOne(req.body));
      break;
    default:
      break;
  }
};
export default handler;
