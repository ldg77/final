import connectMongo from "@/lib/dbConnect";
import * as shopitem from "@/model/ShopItem";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  switch (req.method) {
    case "GET":
      res.json(await shopitem.getAll());
      break;
    case "POST":
      console.log(req.body);

      res.status(200).json(await shopitem.create(req.body));
      break;
    default:
      break;
  }
};
export default handler;
