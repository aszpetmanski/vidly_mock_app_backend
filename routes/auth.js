import express from "express";
import { User } from "../models/user.js";
import _ from "lodash";
import bcrypt from "bcrypt";
import Joi from "joi";

const router = express.Router();
router.use(express.json());

router.post("/", async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();

  res.send(token);
});

function validate(req) {
  const s = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  const { error } = s.validate(req);
  return error;
}

export default router;
