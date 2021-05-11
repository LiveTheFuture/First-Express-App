/**
 * 1. Create a connection function for MongoDB
 * 2. Start a local mongoDB server connection
 */

const mongoose = require ('mongoose');

require('dotenv').config();
const { MONGO_URI } = process.env;

//Create a connection function

const connectDB = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology : true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('MongoDB connected....')

        //Seed data
    })
    .catch ((err) => {
        console.error(err.message);

        //Exit with failure
        process.exit(1);
    })
}

module.exports = connectDB;

