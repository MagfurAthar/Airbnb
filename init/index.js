const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../Models/listing.js');

const MONGO_URL = "mongodb://localhost:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}


main().then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Failed to connect to MongoDB", err);
});


const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
}
initDB();