const db = require("../startup/database");
const { FlightState, validate } = require("../models/flight_state");
const express = require("express");
const router = express.Router();

router.get('/', async(req, res) => {
    const flightState = await FlightState.findAll();
    res.send(flightState);
});

router.get('/:id', async(req, res) => {
    const flightState = await FlightState.findByPk(req.params.id);
    if (!flightState) return res.status(404).send("The flight state with the given ID was not found");

    res.send(flightState);
})

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const flightState = await FlightState.create(req.body);
    res.send(flightState); 
});

router.put('/:id', async(req, res) => {
    let flightState = await FlightState.findByPk(req.params.id);
    if (!flightState) return res.status(404).send("The flight state with the given ID was not found");

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    flightState = await FlightState.update(req.body, {
        where : {
            flight_class_id : req.params.id
        }
    });
    res.send(await FlightState.findByPk(req.params.id));
});

router.delete('/:id', async(req, res) => {
    let flightState = await FlightState.findByPk(req.params.id);
    if (!flightState) return res.status(404).send("The flight state with given id was not found");

    FlightState.destroy({
        where : {
            flight_class_id: req.params.id
        },
    });
    res.send(flightState);
});

module.exports = router;