import connectMongo from "@/lib/dbConnect";
import * as maincolor from "@/model/MainColors";
import { NextApiRequest, NextApiResponse } from "next";

const id = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      res.status(200).json(await maincolor.findById(id as string));
      break;
    case "POST":
      res
        .status(201)
        .json(await maincolor.findByIdUpdatePost(id as string, req.body));
      break;
    case "PATCH":
      res
        .status(201)
        .json(await maincolor.findByIdUpdatePatch(id as string, req.body));
      break;
    default:
      break;
  }
};
export default id;
