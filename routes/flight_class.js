const db = require("../startup/database");
const { FlightClass, validate } = require("../models/flight_class");
const express = require("express");
const router = express.Router();

router.get('/', async(req, res) => {
    const flightClasses = await FlightClass.findAll();
    res.send(flightClasses);
});

router.get('/:id', async(req, res) => {
    const flightClass = await FlightClass.findByPk(req.params.id);
    if (!flightClass) return res.status(404).send("The flight class with the given ID was not found");

    res.send(flightClass);
})

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const flightClass = await FlightClass.create(req.body);
    res.send(flightClass); 
});

router.put('/:id', async(req, res) => {
    let flightClass = await FlightClass.findByPk(req.params.id);
    if (!flightClass) return res.status(404).send("The flight class with the given ID was not found");

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    flightClass = await FlightClass.update(req.body, {
        where : {
            flight_class_id : req.params.id
        }
    });
    res.send(await FlightClass.findByPk(req.params.id));
});

router.delete('/:id', async(req, res) => {
    let flightClass = await FlightClass.findByPk(req.params.id);
    if (!flightClass) return res.status(404).send("The flight class with given id was not found");

    FlightClass.destroy({
        where : {
            flight_class_id: req.params.id
        },
            restartIdentity: true
    });
    res.send(flightClass);
});

module.exports = router;