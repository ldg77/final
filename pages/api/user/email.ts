import connectMongo from "@/lib/dbConnect";
import User from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  switch (req.method) {
    case "POST":
      return res
        .status(200)
        .json(await User.findOne({ email: req.body.email }));
  }
};
