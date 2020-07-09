const Sequelize = require("sequelize");
const config = require("config");

const db = new Sequelize(config.get('database'), config.get('username'), 
    config.get('password'), 
    {
        host: config.get('host'),
        dialect: config.get('dialect'),
        // operatorsAliases: false,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });

module.exports = db;