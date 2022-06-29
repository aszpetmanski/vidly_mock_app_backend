import mongoose from "mongoose";
import Joi from "joi";

const genreSchema = mongoose.Schema({
    "name" : {
        type: String,
        required: true,
        minLength: 3
    }
})


const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    const s = Joi.object({name: Joi.string().min(3).required()});
    const { error } = s.validate(genre);
    return error;
}

export {Genre, genreSchema, validateGenre};