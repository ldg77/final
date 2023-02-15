import connectMongo from "@/lib/dbConnect";
import * as user from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  switch (req.method) {
    case "GET":
      res.status(200).json(await user.getAll());
      break;

    case "POST":
      res.status(200).json(await user.create(req.body));
      break;

    default:
      break;
  }
};
export default handler;
