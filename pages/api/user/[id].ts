import connectMongo from "@/lib/dbConnect";
import User from "@/model/User";
import { findOneUser } from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";

const id = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      res.status(200).json(await findOneUser(id as string));
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
export default id;
