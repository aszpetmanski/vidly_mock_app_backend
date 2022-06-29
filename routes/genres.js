import express from "express";
import { Genre, validateGenre } from "../models/genre.js";
import { auth } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

const router = express.Router();
router.use(express.json());

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send(`Gatunek o podanym ID nie istnieje`);
  res.send(genre);
});

router.get("/", async (req, res) => {

    const genres = await Genre.find().sort("name");
    res.send(genres);
 
});

router.post("/", auth, async (req, res) => {
  const error = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre(req.body);
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", auth, async (req, res) => {
  const error = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { name: req.body.name } },
    { new: true }
  );
  if (!genre) return res.status(404).send(`Gatunek o podanym ID nie istnieje`);

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete({ _id: req.params.id });
  if (!genre) return res.status(404).send(`Gatunek o podanym ID nie istnieje`);

  res.send(genre);
});

export default router;
