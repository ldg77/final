import connectMongo from "@/lib/dbConnect";
import Layout from "@/model/Layout";

import { NextApiRequest, NextApiResponse } from "next";

const id = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      res.status(200).json(await Layout.findById(id));
      break;
    case "POST":
      res.status(201).json(await Layout.findByIdAndUpdate(id, req.body));
      break;
    case "PATCH":
      const layout = await Layout.findById(id);
      res
        .status(201)
        .json(await Layout.findByIdAndUpdate(id, { ...layout, ...req.body }));
      break;
    default:
      break;
  }
};
export default id;
