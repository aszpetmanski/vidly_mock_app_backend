import express from "express";
import { Genre } from "../models/genre.js";
import { Movie, validateMovie } from "../models/movie.js";
import { auth } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

const router = express.Router();
router.use(express.json());

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send(`Film o podanym ID nie istnieje`);
  res.send(movie);
});

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

router.post("/", auth, async (req, res) => {
  const error = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.send(movie);
});

router.put("/:id", auth, async (req, res) => {
  const error = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");

  let movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);

  // STWORZ DEBILU ZMIENNA GENRE i wpierdol ja do funkcji FINDBYID AND UPDATE
  //na zasadzie genre.id, genre.name jak w poscie
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const movie = await Movie.findByIdAndDelete({ _id: req.params.id });
  if (!movie) return res.status(404).send(`Film o podanym ID nie istnieje`);

  res.send(movie);
});

export default router;
