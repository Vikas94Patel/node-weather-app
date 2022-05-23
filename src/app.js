const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { hasSubscribers } = require("diagnostics_channel");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Andrew Mead",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Vikas",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Andrew Mead",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address term",
    });
  }

  const address = req.query.address;

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        location,
        forecast: data,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.key);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error 404",
    error: "Help article not found",
    name: "Vikas",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error 404",
    error: "Page not found",
    name: "Vikas",
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001.");
});
