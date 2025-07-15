const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
  title: {
    type:String,
    required: true,
  },
  description: String,
  image: {type: String,
    // default image if image not exists-----------------
    default: "https://unsplash.com/photos/blue-and-white-star-illustration-JpTY4gUviJM",
    // default image if none is provided., means image exists but it's link is empty-----------------
    set: (v) => (v) === "" ? "https://unsplash.com/photos/blue-and-white-star-illustration-JpTY4gUviJM" : v,
  },
  price: Number,
  location: String,
  country: String,
});
const listing = mongoose.model("listing", listingSchema);
module.exports = listing;
// This code defines a Mongoose schema for a listing in an Airbnb-like application.
// The schema includes fields for title, description, image, price, location, and country.
// The model is then exported for use in other parts of the application.
// The schema is used to create a MongoDB collection named "listings" where each document represents a listing.
// The fields are defined with their respective data types, such as String and Number.
// The listing model can be used to create, read, update, and delete listings in the MongoDB database.
// The code uses Mongoose, a popular ODM (Object Data Modeling) library for MongoDB and Node.js.
// This allows for easy interaction with the MongoDB database using JavaScript objects.
