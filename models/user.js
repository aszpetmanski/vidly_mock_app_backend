import Joi from "joi";
import mongoose from "mongoose";
import JoiPasswordComplexity from "joi-password-complexity";
import jsonwebtoken from "jsonwebtoken";
import config from "config";

const userSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true,
            minlength: 3
        },

        email : {
            type: String,
            required: true,
            unique: true
        },

        password : {
            type: String,
            required: true,
            minlength: 9
        },

        isAdmin: Boolean
    }
)

userSchema.methods.generateAuthToken = function() {
    const token = jsonwebtoken.sign({_id: this._id, isAdmin: this.isAdmin}, config.get("jwtPrivateKey"));
    return token;
}

const User = mongoose.model('User', userSchema);


function validateUser(user) {
    const s = Joi.object({
        name: Joi.string().min(3).required(), 
        email: Joi.string().required().email(), 
        password: JoiPasswordComplexity()
    });
    const { error } = s.validate(user);
    return error;
}

export {User, validateUser, userSchema};