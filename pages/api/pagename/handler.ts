import connectMongo from "@/lib/dbConnect";
import * as page from "@/model/PageName";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  switch (req.method) {
    case "GET":
      res.status(200).json(await page.getAll());
      break;

    case "POST":
      res.status(200).json(await page.create(req.body));
      break;

    default:
      break;
  }
};
export default handler;
