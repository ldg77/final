import connectMongo from "@/lib/dbConnect";
import User from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      res.status(200).json(await User.findById(id));
      break;
    case "POST":
      res.status(200).json(await User.findByIdAndUpdate(id, req.body));
      break;
    case "PATCH":
      res.status(200).json(await User.findByIdAndUpdate(id, req.body));
      break;
    default:
      break;
  }
};
