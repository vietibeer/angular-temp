const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const config = require('./config/dev');
const FakeDb = require('./fake-db');
const rentalRouters = require('./routes/rental');

mongoose.connect(config.DB_URI).then(() => {
    const fakedb = new FakeDb();
    fakedb.seedDb();
});

app.use('/api/v1/rentals', rentalRouters);

app.listen(PORT, () => {
    console.log(`port ${PORT} running`);
});