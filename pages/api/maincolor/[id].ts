import connectMongo from "@/lib/dbConnect";
import MainColor from "@/model/MainColors";
import { NextApiRequest, NextApiResponse } from "next";

const id = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      res.status(200).json(await MainColor.findById(id));
      break;
    case "POST":
      res.status(201).json(await MainColor.findByIdAndUpdate(id, req.body));
      break;
    case "PATCH":
      const page = await MainColor.findById(id);
      res
        .status(201)
        .json(await MainColor.findByIdAndUpdate(id, { ...page, ...req.body }));
      break;
    default:
      break;
  }
};
export default id;
