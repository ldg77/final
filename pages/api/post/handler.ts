import connectMongo from "@/lib/dbConnect";
import * as post from "@/model/Post";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  switch (req.method) {
    case "GET":
      res.status(200).json(await post.getAll());
      break;

    case "POST":
      res.status(200).json(await post.createOne(req.body));
      break;

    default:
      break;
  }
};
export default handler;
