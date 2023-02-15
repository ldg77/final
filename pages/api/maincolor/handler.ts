import connectMongo from "@/lib/dbConnect";
import * as maincolor from "@/model/MainColors";

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  switch (req.method) {
    case "GET":
      res.status(200).json(await maincolor.getAll());
      break;
    case "POST":
      res.status(200).json(await maincolor.create(req.body));
      break;

    default:
      break;
  }
};
export default handler;
