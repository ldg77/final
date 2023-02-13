import connectMongo from "@/lib/dbConnect";
import MainColor from "@/model/MainColors";

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  switch (req.method) {
    case "GET":
      res.status(200).json(await MainColor.find({}).sort({ updatedAt: -1 }));
      break;
    case "POST":
      res.status(200).json(await MainColor.create(req.body));
      break;

    default:
      break;
  }
};
