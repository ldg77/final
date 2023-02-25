import query from "@/lib/queryApi";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const ressponse = await query(req.body.question, null);
  switch (req.method) {
    case "POST":
      return res.status(200).json(ressponse);
    default:
      break;
  }
};
export default handler;
