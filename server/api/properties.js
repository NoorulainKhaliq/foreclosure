const router = require("express").Router();
const gatherData = require("./gather-data.js");

module.exports = router;

const properties = gatherData();

router.get("/", (req, res, next) => {
  properties.then(response => {
    res.status(200).json(response);
  });
});
