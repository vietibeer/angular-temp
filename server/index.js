const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const config = require('./config/dev');
const FakeDb = require('./fake-db');
const bodyParser = require('body-parser');
const rentalRouters = require('./routes/rental');
const userRouters = require('./routes/user');

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
    const fakedb = new FakeDb();
    // fakedb.seedDb();
});

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/v1/rentals', rentalRouters);
app.use('/api/v1/user', userRouters);

app.listen(PORT, () => {
    console.log(`port ${PORT} running`);
});

// NOTE: Relationship 1-N
// User can have multiple rentals. Rental can have just one User.