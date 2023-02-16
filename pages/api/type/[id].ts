import connectMongo from "@/lib/dbConnect";
import * as type from "@/model/Type";
import { NextApiRequest, NextApiResponse } from "next";

const id = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      res.status(200).json(await type.findById(id as string));
      break;
    case "POST":
      res
        .status(201)
        .json(await type.findByIdUpdatePost(id as string, req.body));
      break;
    case "PATCH":
      const mytype = await type.findById(id as string);
      res.status(201).json(
        await type.findByIdUpdatePatch(id as string, {
          ...mytype,
          ...req.body,
        })
      );
      break;
    default:
      break;
  }
};
export default id;
