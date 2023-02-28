import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      console.log(req.body);

      const session = await stripe.checkout.sessions.create({
        line_items: req.body,
        mode: "payment",
        success_url: `${req.headers.origin}/show/thanks`,
        cancel_url: `${req.headers.origin}/show/page`,
      });
      res.status(200).json(session.url!);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
