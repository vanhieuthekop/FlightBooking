const db = require("../startup/database");
const { Aircraft, validate } = require("../models/aircrafts");
const express = require("express");
const router = express.Router();

router.get('/', async(req, res) => {
    const aircraft = await Aircraft.findAll();
    res.send(aircraft);
});

router.get('/:id', async(req, res) => {
    const aircraft = await Aircraft.findByPk(req.params.id);
    if (!aircraft) return res.status(404).send("The flight state with the given ID was not found");

    res.send(aircraft);
})

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const aircraft = await Aircraft.create(req.body);
    res.send(aircraft); 
});

router.put('/:id', async(req, res) => {
    let aircraft = await Aircraft.findByPk(req.params.id);
    if (!aircraft) return res.status(404).send("The flight state with the given ID was not found");

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    aircraft = await Aircraft.update(req.body, {
        where : {
            aircraft_id : req.params.id
        }
    });
    res.send(await Aircraft.findByPk(req.params.id));
});

router.delete('/:id', async(req, res) => {
    let aircraft = await Aircraft.findByPk(req.params.id);
    if (!aircraft) return res.status(404).send("The flight state with given id was not found");

    Aircraft.destroy({
        where : {
            aircraft_id: req.params.id
        }
    });
    res.send(aircraft);
});

module.exports = router;