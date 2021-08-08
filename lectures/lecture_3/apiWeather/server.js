const express = require("express");
const morgan = require("morgan");
const got = require("got");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const BASE_URL = "http://api.weatherbit.io/v2.0/current";
const API_KEY = process.env.API_KEY;

app.get("/api/weather", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const response = await got(BASE_URL, {
      searchParams: {
        key: API_KEY,
        lat: latitude,
        lon: longitude,
      },
      responseType: "json",
    });

    const [weatherData] = response.body.data;
    const {
      city_name,
      temp,
      weather: { description },
    } = weatherData;

    res.json({ data: { city_name, temp, description } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("error at server launch", err);
  }
  console.log(`server works at port ${PORT}`);
});
