const {DataTypes} = require('sequelize');
const db = require('../startup/database');
const Joi = require('joi');

const Airport = db.define('airports', {
    IATA_code : {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name : {
        type: DataTypes.STRING
    },
    city : {
        type: DataTypes.STRING
    },
    country : {
        type: DataTypes.STRING
    }

}, {timestamps: false});

function validateAirport(airport) {
    const schema = {
        IATA_code: Joi.string().max(45),
        name: Joi.string().max(45),
        city: Joi.string().max(45),
        country: Joi.string().max(45)
    }

    return Joi.validate(airport, schema);
}

module.exports.Airport = Airport;
module.exports.validate = validateAirport;