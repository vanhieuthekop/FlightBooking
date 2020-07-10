const db = require("../startup/database");
const {Flight,validate} = require("../models/flights");
const express = require("express");
const router = express.Router();

router.get('/', async(req, res) => {
    const flights = await Flight.findAll();
    res.send(flights);
});

router.get('/:id', async(req, res) => {
    const flight = await Flight.findByPk(req.params.id);

    if (!flight) return res.status(404).send("The flight with the given ID was not found.");

    res.send(flight);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body, "create");
    if (error) return res.status(400).send(error.details[0].message);

    const flight = await Flight.create(req.body); 
    res.send(flight);
})

router.put('/:id', async(req, res) => {
    let flight = await Flight.findByPk(req.params.id);
    if (!flight) return res.status(404).send("The flight with the given ID was not found.");

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    flight = await Flight.update( req.body , {
        where : {
            flight_id : req.params.id
        }
    } );
    res.send(await Flight.findByPk(req.params.id));
});

router.delete ('/:id', async(req, res) => {
    let flight = await Flight.findByPk(req.params.id);
    if (!flight) return res.status(404).send("The flight with the given ID was not found.");
    Flight.destroy({
        where : {
            flight_id : req.params.id
        }
    });
    
    res.send(flight);
});

module.exports = router;