const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 8082;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}, ${new Date().toISOString()}`);
  next();
});

// app.get("/home", (req, res) => {
//   res.json({ javascript: "object" });
// });

app.post("/home", (req, res) => {
  if (!req.body.node) {
    return res.status(400).json({ status: "node parameter is requered" });
  }
  res.json({ javascrip: "object", body: "req.body" });
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
