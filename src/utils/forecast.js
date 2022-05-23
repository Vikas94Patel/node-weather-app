const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=6d5d45c623ab79e8c7eaee0f334d0c4c&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect  to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to get the location!", undefined);
    } else {
      callback(
        undefined,
        "Its is currently " +
          body.current.temperature +
          " degrees out. It feel like " +
          body.current.feelslike +
          " degrees out there."
      );
    }
  });
};

module.exports = forecast;

// const url =
//   "http://api.weatherstack.com/current?access_key=6d5d45c623ab79e8c7eaee0f334d0c4c&query=indore";

// request({ url: url, json: true }, (error, response) => {
//
// });
