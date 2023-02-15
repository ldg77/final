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
    case "PUT":
      res.status(201).json(await Layout.findByIdAndUpdate(id, req.body));
      break;
    case "PATCH":
      const layout = await Layout.findById(id);
      const combo = { ...layout._doc, ...req.body };
      res.status(201).json(await Layout.findByIdAndUpdate(id, combo));
      break;
    default:
      break;
  }
};
export default id;
