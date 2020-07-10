const {DataTypes} = require('sequelize');
const db = require('../startup/database');
const Joi = require('joi');

const FlightState = db.define('flight_state', {
    state_id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name : {
        type: DataTypes.STRING
    }
}, {timestamps: false});

function validateFlightState(flightState) {
    const schema = {
        name: Joi.string().max(50).required()
    }

    return Joi.validate(flightState, schema);
}

module.exports.FlightState = FlightState;
module.exports.validate = validateFlightState;