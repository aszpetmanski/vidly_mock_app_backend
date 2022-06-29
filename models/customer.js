import Joi from "joi";
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        "name" : {
            type: String,
            required: true,
            minlength: 3
        },

        "phone" : {
            type: String,
            required: true,
            minlength: 9
        },

        "isGold" : {
            type: Boolean,
            required: true,
            default: false
        }
    }
)

const Customer = mongoose.model('Customer', customerSchema);


function validateCustomer(customer) {
    const s = Joi.object({name: Joi.string().min(3).required(), 
        phone: Joi.string().min(9).required(), isGold: Joi.boolean().required()});
    const { error } = s.validate(customer);
    return error;
}

export {Customer, validateCustomer, customerSchema};