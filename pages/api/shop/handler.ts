import connectMongo from "@/lib/dbConnect";
import * as shop from "@/model/Shop";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  switch (req.method) {
    case "GET":
      res.status(200).json(await shop.getAll());
      break;
    case "POST":
      res.status(200).json(await shop.create(req.body));
      break;
    default:
      break;
  }
};
export default handler;
