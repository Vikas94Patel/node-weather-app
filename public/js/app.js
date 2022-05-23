console.log("Js file from node!");

fetch("http://localhost:3001/weather?address=!").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data.location);
      console.log(data.forecast);
    }
  });
});

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const weatherData1 = document.querySelector("#weather-data1");
const weatherData2 = document.querySelector("#weather-data2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = searchElement.value;
  weatherData1.textContent = "Loading...";
  weatherData2.textContent = "";

  fetch("http://localhost:3001/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          weatherData1.textContent = data.error;
        } else {
          weatherData1.textContent = data.location;
          weatherData2.textContent = data.forecast;
        }
      });
    }
  );
});
