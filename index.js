const db = require("./startup/database");
const config = require("config");
const cors = require("cors");
const express = require("express");
const app = express();

const passengers = require('./routes/passengers');
const flightClasses = require('./routes/flight_class');
const flightStates = require('./routes/flight_state');
const aircrafts = require('./routes/aircrafts');
const airports = require('./routes/airports');
const flights = require('./routes/flights');

app.use(cors());
app.use(express.json());

app.use('/api/passengers', passengers);
app.use('/api/flightclass', flightClasses);
app.use('/api/flightstate', flightStates);
app.use('/api/aircrafts', aircrafts);
app.use('/api/airports', airports);
app.use('/api/flights', flights);

db.sync();

const port = process.env.PORT || config.get("port");

const server = app.listen(port, () =>{
    console.log(`Listening on port ${port}...`);
});