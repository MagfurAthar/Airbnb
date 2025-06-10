const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const ejs = require('ejs');
const listing = require("./Models/listing.js");
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));

const MONGO_URL = "mongodb://localhost:27017/wanderlust";
async function main(params) {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// app.get("/testListing", async (req, res) => {
//     let sampleListing = new listing({
//         title: "Cozy Cottage",
//         description: "A cozy cottage in the woods",
//         image: "https://unsplash.com/photos/blue-and-white-star-illustration-JpTY4gUviJM",
//         price: 100,
//         location: "Forest",
//         country: "Wonderland"
//     });
//     sampleListing = await sampleListing.save();
//     console.log("Sample listing saved:", sampleListing);
//     res.send("Sample listing created successfully");
// });

// Index route---------------------------------
app.get("/listings", async (req, res) => {
  // await listing.find({}).then((res) => {
  //   console.log("Listings fetched successfully:", res);
  //   console.log(res);
  // });

  const allListings = await listing.find({});
  res.render("listings/index.ejs", { allListings });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.get("/", (req, res) => {
  res.send("Welcome to Airbnb");
});

// New route---------------------------------
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Create route---------------------------------
app.post("/listings", async (req, res) => {
  // let { title, description, image, price, location, country } = req.body;
  const newListing = new listing({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
    location: req.body.location,
    country: req.body.country,
  });

  await newListing.save();
  res.redirect("/listings");
});

// Show route---------------------------------
app.get("/listings/:id", async (req, res) => {
  const foundlisting = await listing.findById(req.params.id);
  res.render("listings/show.ejs", { listing: foundlisting });
});


