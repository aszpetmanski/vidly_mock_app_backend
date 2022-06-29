import express from "express";
import customers from "../routes/customers.js";
import movies from "../routes/movies.js";
import rentals from "../routes/rentals.js";
import users from "../routes/users.js";
import auth from "../routes/auth.js";
import { error } from "../middleware/error.js";
import genres from "../routes/genres.js";



export function routes(app) {
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);

  app.use(error);
}
