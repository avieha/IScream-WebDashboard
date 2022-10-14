const mongoose = require('mongoose');
require('dotenv').config({ path: require('find-config')('.env') })

mongoose.connect(process.env.MONGO_DB_URL);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PurchaseSchema = mongoose.Schema({

        _id: mongoose.Schema.Types.ObjectId,

        taste: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        day: {
            type: Date,
        },
        month: {
            type: Date,
        },
        year: {
            type: Date,
        },
        cityName: {
            type: String,
        },
        cityType: {
            type: String,
        },
        toddlers: {
            type: String,
        },
        kids: {
            type: String,
        },
        adolescent: {
            type: String,
        },
        adults: {
            type: String,
        },
        middleAge: {
            type: String,
        },
        seniors: {
            type: String,
        },
        season: {
            type: Number,
        },
        holiday: {
            type: String,
        },
        weather: {
            type: String,
        }

    },
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to MongoDB");
});

module.exports = mongoose.model('Purchases', PurchaseSchema);