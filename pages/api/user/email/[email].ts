import connectMongo from "@/lib/dbConnect";
import * as user from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";

const email = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { email } = req.query;
  switch (req.method) {
    case "GET":
      return res.status(200).json(await user.findByEmail(email as string));
  }
};
export default email;
