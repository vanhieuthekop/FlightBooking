const {DataTypes} = require('sequelize');
const db = require('../startup/database');
const Joi = require('joi');

const Aircraft = db.define('aircrafts', {
    aircraft_id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name : {
        type: DataTypes.STRING
    },
    total_seat : {
        type: DataTypes.SMALLINT
    },
    empty_seat : {
        type: DataTypes.SMALLINT
    }

}, {timestamps: false});

function validateAircaft(aircaft) {
    const schema = {
        name: Joi.string().max(50).required(),
        total_seat: Joi.number().required(),
        empty_seat: Joi.number()
    }

    return Joi.validate(aircaft, schema);
}

module.exports.Aircraft = Aircraft;
module.exports.validate = validateAircaft;