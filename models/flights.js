const {DataTypes} = require('sequelize');
const db = require('../startup/database');
const Joi = require('joi');
const {FlightState} = require('../models/flight_state');
const {Aircraft} = require('../models/aircrafts');
const {Airport} = require('../models/airports');

const Flight = db.define('flights', {
    flight_id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departure_date_time : {
        type: DataTypes.DATE
    },
    arrival_date_time : {
        type: DataTypes.DATE
    },
    duration_in_minutes : {
        type: DataTypes.SMALLINT
    },
    distance_in_km : {
        type: DataTypes.SMALLINT
    },


}, {timestamps: false});

FlightState.hasMany(Flight, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
    foreignKey: {
        name : 'state_id'
    }
});

Aircraft.hasMany(Flight, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
    foreignKey: {
        name : 'aircraft_id'
    }
});

Airport.hasMany(Flight, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
    foreignKey: {
        name : 'departure_IATA_code'
    }
});

Airport.hasMany(Flight, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
    foreignKey: {
        name : 'destination_IATA_code'
    }
});


function validateFlight(flight) {
    const schema = {
        departure_date_time: Joi.date(),
        arrival_date_time: Joi.date(),
        duration_in_minutes: Joi.number(),
        distance_in_km: Joi.number(),
        departure_IATA_code: Joi.string(),
        destination_IATA_code: Joi.string(),
        aircraft_id: Joi.number(),
        state_id: Joi.number()
    }

    return Joi.validate(flight, schema);
}

module.exports.Flight = Flight;
module.exports.validate = validateFlight;