const express = require("express");
const app = express();

const router = require("./router");

app.use(express.json());
app.use(router);

app.listen(3333, "192.168.1.74", () => {
  console.log("server run port 3000");
});
