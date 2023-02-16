import connectMongo from "@/lib/dbConnect";
import * as type from "@/model/Type";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  switch (req.method) {
    case "GET":
      res.status(200).json(await type.getAll());
      break;

    case "POST":
      res.status(200).json(await type.create(req.body));
      break;

    default:
      break;
  }
};
export default handler;
