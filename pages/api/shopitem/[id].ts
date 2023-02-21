import connectMongo from "@/lib/dbConnect";
import * as shopitem from "@/model/ShopItem";
import { NextApiRequest, NextApiResponse } from "next";

const id = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      res.status(200).json(await shopitem.findById(id as string));
      break;
    case "POST":
      res
        .status(200)
        .json(await shopitem.findByIdUpdatePost(id as string, req.body));
      break;
    case "PATCH":
      res
        .status(200)
        .json(await shopitem.findByIdUpdatePatch(id as string, req.body));
      break;
    default:
      break;
  }
};
export default id;
