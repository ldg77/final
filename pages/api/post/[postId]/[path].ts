import connectMongo from "@/lib/dbConnect";
import * as post from "@/model/Post";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { postId, path } = req.query;
  switch (req.method) {
    case "POST":
      res
        .status(200)
        .json(
          await post.createonPath(postId as string, path as string, req.body)
        );
      break;
    case "GET":
      res
        .status(200)
        .json(await post.getOnPath(postId as string, path as string));
      break;

    default:
      break;
  }
};
export default handler;
