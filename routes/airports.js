const db = require("../startup/database");
const {Airport,validate} = require("../models/airports");
const express = require("express");
const router = express.Router();

router.get('/', async(req, res) => {
    const airports = await Airport.findAll();
    res.send(airports);
});

router.get('/:id', async(req, res) => {
    const airport = await Airport.findByPk(req.params.id);

    if (!airport) return res.status(404).send("The airport with the given ID was not found.");

    res.send(airport);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body, "create");
    if (error) return res.status(400).send(error.details[0].message);

    const airport = await Airport.create(req.body); 
    res.send(airport);
})

router.put('/:id', async(req, res) => {
    let airport = await Airport.findByPk(req.params.id);
    if (!airport) return res.status(404).send("The airport with the given ID was not found.");

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    airport = await Airport.update( req.body , {
        where : {
            airport_id : req.params.id
        }
    } );
    res.send(await Airport.findByPk(req.params.id));
});

router.delete ('/:id', async(req, res) => {
    let airport = await Airport.findByPk(req.params.id);
    if (!airport) return res.status(404).send("The airport with the given ID was not found.");
    Airport.destroy({
        where : {
            airport_id : req.params.id
        }
    }); 
    res.send(airport);
});

module.exports = router;