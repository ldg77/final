import connectMongo from "@/lib/dbConnect";
import * as page from "@/model/PageName";
import { NextApiRequest, NextApiResponse } from "next";

const id = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      res.status(200).json(await page.findById(id as string));
      break;
    case "POST":
      res
        .status(201)
        .json(await page.findByIdUpdatePost(id as string, req.body));
      break;
    case "PATCH":
      const mypage = await page.findById(id as string);
      res
        .status(201)
        .json(
          await page.findByIdUpdatePatch(id as string, {
            ...mypage,
            ...req.body,
          })
        );
      break;
    default:
      break;
  }
};
export default id;
