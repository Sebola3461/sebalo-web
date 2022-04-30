import { Request, Response } from "express";
import updateRequestsStatus from "../helpers/channel/updateRequestsStatus";

export default async (req: Request, res: Response) => {
  const channel = req.params.channel;

  const scopes: any = {
    pauseRequests: updateRequestsStatus,
  };

  if (!req.body)
    return res.status(400).send({
      status: 400,
      message: "Invalid body",
    });

  const { scope } = req.body;

  if (!scope || typeof scope != "string")
    return res.status(400).send({
      status: 400,
      message: "Invalid scope",
    });

  try {
    scopes[scope](req, res);
  } catch (e) {
    console.error(e);

    return res.status(400).send({
      status: 400,
      message: "Invalid scope",
    });
  }
};
