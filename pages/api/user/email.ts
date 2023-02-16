import connectMongo from "@/lib/dbConnect";
import * as user from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";

const email = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();

  switch (req.method) {
    case "POST":
      return res.status(200).json(await user.findByEmail(req.body.email));
  }
};
export default email;
