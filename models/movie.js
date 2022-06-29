import Joi from "joi";
import mongoose from "mongoose";
import {genreSchema} from "./genre.js"


const movieSchema = new mongoose.Schema(
    {
        "title" : {
            type: String,
            required: true,
            minlength: 3
        },

        "numberInStock" : {
            type: Number,
            default: 0
        },

        "dailyRentalRate" : {
            type: Number,
            default: 0
        },

        "genre" : {
            type: genreSchema,
            required: true}
    }
)

const Movie = mongoose.model('Movie', movieSchema);


function validateMovie(movie) {
    const s = Joi.object({title: Joi.string().min(3).required(), 
        genreId: Joi.objectId().required(), dailyRentalRate: Joi.number().required(), numberInStock: Joi.number().required()});
    const { error } = s.validate(movie);
    return error;
}

export {Movie, validateMovie, movieSchema};