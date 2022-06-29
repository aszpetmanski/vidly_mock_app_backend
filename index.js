import Joi from "joi";
import joiObjectid from "joi-objectid";
Joi.objectId = joiObjectid(Joi);
import express from "express";

import { routes } from "./startup/routes.js";
import { mongodb } from "./startup/mongodb.js";
import { logger } from "./startup/logging.js";
import { configing } from "./startup/config.js";

const app = express();

logger();
configing();
routes(app);
mongodb(); 



const port = process.env.PORT || 3000;
export const server = app.listen(port, () => console.log(`Listening on port ${port}...`));


