import express from "express";
import {Customer, validateCustomer} from "../models/customer.js"
import { auth } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

const router = express.Router();
router.use(express.json());





router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send(`Użytkownik o podanym ID nie istnieje`);
    res.send(customer);
})


router.get('/', async (req, res) => {
    const customers =  await Customer.find().sort('name');
    res.send(customers)
});

router.post('/', auth,  async (req, res) => {
    const error = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer(req.body);
    customer = await customer.save();
    res.send(customer)

})

router.put('/:id', auth, async (req, res) => {
    //const error = validateCustomer(req.body);
    //if (error) return res.status(400).send(error.details[0].message);
    const customer = await Customer.findOneAndUpdate({_id:req.params.id}, req.body, {new: true})
    if (!customer) return res.status(404).send(`Użytkownik o podanym ID nie istnieje`);

    res.send(customer);
})  

router.delete('/:id', [auth, admin], async (req, res) => {
    const customer = await Customer.findByIdAndDelete({_id: req.params.id});
    if (!customer) return res.status(404).send(`Użytkownik o podanym ID nie istnieje`);

    res.send(customer);
})  





export default router;