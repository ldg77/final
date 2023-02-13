import connectMongo from "@/lib/dbConnect";
import PageName from "@/model/PageName";
import User from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      res.status(200).json(await PageName.findById(id));
      break;
    case "POST":
      res.status(201).json(await PageName.findByIdAndUpdate(id, req.body));
      break;
    case "PATCH":
      const page = await PageName.findById(id);
      res
        .status(201)
        .json(await PageName.findByIdAndUpdate(id, { ...page, ...req.body }));
      break;
    default:
      break;
  }
};
