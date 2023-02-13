import connectMongo from "@/lib/dbConnect";
import PageName from "@/model/PageName";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  switch (req.method) {
    case "GET":
      res.status(200).json(await PageName.find({}).sort({ updatedAt: -1 }));
      break;

    case "POST":
      res.status(200).json(await PageName.create(req.body));
      break;

    default:
      break;
  }
};
export default handler;
