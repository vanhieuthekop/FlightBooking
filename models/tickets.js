const {DataTypes} = require('sequelize');
const db = require('../startup/database');
const Joi = require('joi');
const {Passenger} = require('./passengers');
const {FlightClass} = require('./flight_class');
const { Flight } = require('./flights');

const Ticket = db.define('tickets', {
    ticket_id : {
        type: DataTypes.INT,
        primaryKey: true,
        autoIncrement: true
    },
    price : {
        type: DataTypes.FLOAT
    },
    seat_number : {
        type: DataTypes.INTEGER
    },
    date_create : {
        type: DataTypes.DATE
    }

}, {timestamps: false});

FlightClass.hasMany(Ticket, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
    foreignKey: {
        name : 'flight_class_id'
    }
});

Passenger.hasMany(Ticket, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
    foreignKey: {
        name : 'passenger_id'
    }
});

Flight.hasMany(Ticket, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
    foreignKey: {
        name : 'flight_id'
    }
});

function validateTicket(ticket) {
    const schema = {
        ticket_id: Joi.string().max(45),
        price: Joi.number(),
        seat_number: Joi.number(),
        date_create: Joi.date()
    }

    return Joi.validate(ticket, schema);
}

module.exports.Ticket = Ticket;
module.exports.validate = validateTicket;