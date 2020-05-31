const moment = require("moment");
// Define logger middleware
const logger = (req, res, next) => {
  console.log("Hello");
  console.log(`${req.protocol}://${req.get("host")}${req.url}`);
  console.log(moment().format());
  next();
};

module.exports = logger;
