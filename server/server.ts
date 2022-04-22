import express from "express";
import { Handler } from "express";
import routes from "./api/routes";
const router = express();
import "./database";

routes(router);

export const handler: Handler = router;
