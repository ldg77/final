import connectMongo from "@/lib/dbConnect";
import { createUser, getAllUser } from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  switch (req.method) {
    case "GET":
      res.status(200).json(await getAllUser());
      break;

    case "POST":
      res.status(200).json(await createUser(req.body));
      break;

    default:
      break;
  }
};
export default handler;
