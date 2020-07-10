const db = require("../startup/database");
const {Passenger,validate} = require("../models/passengers");
const express = require("express");
const router = express.Router();

router.get('/', async(req, res) => {
    const passengers = await Passenger.findAll();
    res.send(passengers);
});

router.get('/:id', async(req, res) => {
    const passenger = await Passenger.findByPk(req.params.id);

    if (!passenger) return res.status(404).send("The passenger with the given ID was not found.");

    res.send(passenger);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body, "create");
    if (error) return res.status(400).send(error.details[0].message);

    const passenger = await Passenger.create(req.body); 
    res.send(passenger);
})

router.put('/:id', async(req, res) => {
    let passenger = await Passenger.findByPk(req.params.id);
    if (!passenger) return res.status(404).send("The passenger with the given ID was not found.");

    const { error } = validate(req.body, "update");
    if (error) return res.status(400).send(error.details[0].message);

    passenger = await Passenger.update( req.body , {
        where : {
            passenger_id : req.params.id
        }
    } );
    res.send(await Passenger.findByPk(req.params.id));
});

router.delete ('/:id', async(req, res) => {
    let passenger = await Passenger.findByPk(req.params.id);
    if (!passenger) return res.status(404).send("The passenger with the given ID was not found.");
    Passenger.destroy({
        where : {
            passenger_id : req.params.id
        }
    });
    
    res.send(passenger);
});

module.exports = router;