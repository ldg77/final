import connectMongo from "@/lib/dbConnect";
import * as layout from "@/model/Layout";

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  switch (req.method) {
    case "GET":
      res.status(200).json(await layout.getAll());
      break;

    case "POST":
      res.status(200).json(await layout.create(req.body));
      break;

    default:
      break;
  }
};
export default handler;
