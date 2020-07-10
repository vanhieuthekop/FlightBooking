const db = require("./startup/database");
const config = require("config");
const cors = require("cors");
const express = require("express");
const app = express();

const passengers = require('./routes/passengers');
const flightClass = require('./routes/flight_class');
const flightState = require('./routes/flight_state');
const aircraft = require('./routes/aircrafts');

app.use(cors());
app.use(express.json());

app.use('/api/passengers', passengers);
app.use('/api/flightclass', flightClass);
app.use('/api/flightstate', flightState);
app.use('/api/aircrafts', aircraft);

db.sync();

const port = process.env.PORT || config.get("port");

const server = app.listen(port, () =>{
    console.log(`Listening on port ${port}...`);
});