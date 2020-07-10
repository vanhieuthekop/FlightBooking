const {Sequelize, DataTypes, Model} = require('sequelize');
const db = require('../startup/database');
const Joi = require('joi');

const Passenger = db.define('passengers', {
    passenger_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    }
}, {timestamps:false});

function validatePassenger(passenger, query) {
    let schema = null;
    if (query == "create"){
        schema = {
            first_name: Joi.string().max(50).required(),
            last_name: Joi.string().max(50).required(),
            email: Joi.string().email().required(),
            address: Joi.string().max(100).required()
        };
    } else if (query == "update"){
        schema = {
            first_name: Joi.string().max(50),
            last_name: Joi.string().max(50),
            email: Joi.string().email(),
            address: Joi.string().max(100)
        }
    }

    return Joi.validate(passenger, schema);
}

module.exports.Passenger = Passenger;
module.exports.validate = validatePassenger;