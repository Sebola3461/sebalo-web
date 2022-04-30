import { NextFunction, Response, Request } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  if (!req.body)
    return res.status(400).send({
      status: 400,
      message: "Invalid body",
    });

  next();
};
