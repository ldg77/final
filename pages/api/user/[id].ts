import connectMongo from "@/lib/dbConnect";
import User from "@/model/User";
import * as user from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";

const id = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      res.status(200).json(await user.findById(id as string));
      break;
    case "POST":
      res
        .status(200)
        .json(await user.findByIdUpdatePost(id as string, req.body));
      break;
    case "PATCH":
      res
        .status(200)
        .json(await user.findByIdUpdatePatch(id as string, req.body));
      break;
    default:
      break;
  }
};
export default id;
