import connectMongo from "@/lib/dbConnect";
import * as layout from "@/model/Layout";
import * as user from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";

const id = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();
  const { id } = req.query;
  const loggeduser = await user.findByEmail(req.body.email);

  //  Need logic for change all layoutItems in all breackpoints
  switch (req.method) {
    case "GET":
      res.status(200).json({});
      break;
    case "PUT":
      res
        .status(201)
        .json(
          await layout.updateAllLayoutItemsPut(
            loggeduser.layout,
            id as string,
            req.body
          )
        );
      break;
    case "PATCH":
      res
        .status(201)
        .json(
          await layout.updateAllLayoutItemsPatch(
            loggeduser.layout,
            id as string,
            req.body
          )
        );
      break;
    default:
      break;
  }
};
export default id;
