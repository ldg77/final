import connectMongo from "@/lib/dbConnect";
import User from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  switch (req.method) {
    case "GET":
      res.status(200).json(await User.find({}));
      break;

    case "POST":
      res.status(200).json(await User.create(req.body));
      break;

    default:
      break;
  }
};
