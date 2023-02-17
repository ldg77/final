import connectMongo from "@/lib/dbConnect";
import * as type from "@/model/Type";
import { NextApiRequest, NextApiResponse } from "next";

const id = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { id, name } = req.query;

  switch (req.method) {
    case "GET":
      res
        .status(201)
        .json(await type.findByIdAndName(id as string, name as string));
      break;
    case "PATCH":
      res
        .status(201)
        .json(
          await type.findByIdAndNameAndUpdate(
            id as string,
            name as string,
            req.body
          )
        );
      break;
    default:
      break;
  }
};
export default id;
