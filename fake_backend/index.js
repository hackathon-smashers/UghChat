const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.json({ success: 1 });
});

app.listen(3030, () => {
  console.log("Listen on the port 3030...");
});
