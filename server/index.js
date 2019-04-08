const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const config = require('./config');
const FakeDb = require('./fake-db');
const bodyParser = require('body-parser');
const path = require('path');

const rentalRouters = require('./routes/rental');
const userRouters = require('./routes/user');
const bookingRouters = require('./routes/booking');
const paymentRoutes = require('./routes/payment');

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
    if (process.env.NODE_ENV !== 'production') {
        const fakedb = new FakeDb();
        // fakedb.seedDb();
    }
    
});

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/v1/rentals', rentalRouters);
app.use('/api/v1/user', userRouters);
app.use('/api/v1/bookings', bookingRouters);
app.use('/api/v1/payments', paymentRoutes);

if (process.env.NODE_ENV === 'production') {
    const appPath = path.join(__dirname, '..', 'dist');
    app.use(express.static(appPath));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(appPath, 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`port ${PORT} running`);
    console.log(process.env.NODE_ENV);
});

// NOTE: Relationship 1-N
// User can have multiple rentals. Rental can have just one User.

//NOTE: Schema
// Do not use arrow function with Schema