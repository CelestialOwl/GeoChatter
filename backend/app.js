const express = require("express");

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.status(200).json({ "Hello World": "Great" });
});

app.listen(port, () => {
  console.log(`Connected on port ${port}`);
});
