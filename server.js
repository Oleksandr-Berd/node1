const express = require("express");
const morgan = require("morgan");
const got = require("got");
require("dotenv").config();
const { router } = require("./booksRouter");
const { json } = require("express");
const app = express();

const PORT = process.env.PORT || 8082;
const thirdPartyBaseUrl = "http://api.weatherbit.io/v2.0/current";
const thirdPartyApiKey = process.env.WEATHER_API_KEY;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use("/api", router);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}, ${new Date().toISOString()}`);
  next();
});

// app.get("/home", (req, res) => {
//   res.json({ javascript: "object" });
// });

app.get("/api/weather", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude) {
      return res
        .status(400)
        .json({ message: "latitude parameter is mandatory" });
    }

    if (!longitude) {
      return res
        .status(400)
        .json({ message: "longitude parameter is mandatory" });
    }

    const response = await got(thirdPartyBaseUrl, {
      searchParams: {
        key: thirdPartyApiKey,
        lat: latitude,
        lon: longitude,
      },
      responseType: "json",
    });
    const [weatherData] = response.body.data;
    const {
      city_name,
      weather: { description },
      temp,
    } = weatherData;
    res.json({ response: city_name, description, temp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/home", (req, res) => {
  res.send("delete request");
});

// app.use((req, res) => {
//   res.json({ javascript: "object" });
// });

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error at a server launch: `, err);
  }
  console.log(`Server works at port ${PORT}!`);
});
