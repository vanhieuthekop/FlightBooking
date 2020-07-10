const {Sequelize, DataTypes, Model} = require('sequelize');
const db = require('../startup/database');
const Joi = require('joi');

const FlightClass = db.define('filght_class', {
    flight_class_id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name : {
        type: DataTypes.STRING
    }
}, {timestamps: false});

function validateFlightClass(flightClass) {
    const schema = {
        name: Joi.string().max(50).required()
    }

    return Joi.validate(flightClass, schema);
}

module.exports.FlightClass = FlightClass;
module.exports.validate = validateFlightClass;