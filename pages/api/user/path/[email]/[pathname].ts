import connectMongo from "@/lib/dbConnect";

import * as user from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";

const pathname = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { email, pathname } = req.query;

  switch (req.method) {
    case "GET":
      res
        .status(200)
        .json(
          await user.findByEmailAndPath(email as string, pathname as string)
        );
      break;
    case "PATCH":
      res
        .status(200)
        .json(
          await user.findByEmailAndClear(email as string, pathname as string)
        );
      break;

    default:
      break;
  }
};
export default pathname;
