const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const config = require('./config/dev');
const FakeDb = require('./fake-db');
const rentalRouters = require('./routes/rental');

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
    const fakedb = new FakeDb();
    fakedb.seedDb();
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/v1/rentals', rentalRouters);

app.listen(PORT, () => {
    console.log(`port ${PORT} running`);
});