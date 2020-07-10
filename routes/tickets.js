const db = require("../startup/database");
const {Ticket,validate} = require("../models/tickets");
const express = require("express");
const router = express.Router();

router.get('/', async(req, res) => {
    const tickets = await Ticket.findAll();
    res.send(tickets);
});

router.get('/:id', async(req, res) => {
    const ticket = await Ticket.findByPk(req.params.id);

    if (!ticket) return res.status(404).send("The ticket with the given ID was not found.");

    res.send(ticket);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body, "create");
    if (error) return res.status(400).send(error.details[0].message);

    const ticket = await Ticket.create(req.body); 
    res.send(ticket);
})

router.put('/:id', async(req, res) => {
    let ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).send("The ticket with the given ID was not found.");

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    ticket = await Ticket.update( req.body , {
        where : {
            ticket_id : req.params.id
        }
    } );
    res.send(await Ticket.findByPk(req.params.id));
});

router.delete ('/:id', async(req, res) => {
    let ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).send("The ticket with the given ID was not found.");
    Ticket.destroy({
        where : {
            ticket_id : req.params.id
        }
    });
    
    res.send(ticket);
});

module.exports = router;