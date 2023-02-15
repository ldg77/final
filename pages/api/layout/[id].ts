import connectMongo from "@/lib/dbConnect";
import * as layout from "@/model/Layout";
import { NextApiRequest, NextApiResponse } from "next";

const id = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      res.status(200).json(await layout.findById(id as string));
      break;
    case "PUT":
      res
        .status(201)
        .json(await layout.findByIdUpdatePost(id as string, req.body));
      break;
    case "PATCH":
      res
        .status(201)
        .json(await layout.findByIdUpdatePatch(id as string, req.body));
      break;
    default:
      break;
  }
};
export default id;
