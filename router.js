const admin = require("./config/admin");
const express = require("express");
const router = express.Router();

router.post("/send", async (req, res) => {
  const { token, descr } = req.body;

  var message = {
    data: {
      body: descr,
    },
  };
  var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };

  admin
    .messaging()
    .sendToDevice(token, message, options)
    .then((response) => {
      console.log("Successfully sent message:", response);
      return res.json({ "Successfully sent message:": response });
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      return res.json({ "Error sent message:": error });
    });
});

module.exports = router;
