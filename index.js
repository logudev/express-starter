const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const logger = require("./middleware/logger");
const members = require("./Members");

// Init express
const app = express();

// API Routes
const membersAPI = require("./routes/api/members");

// Init Logger middleware
app.use(logger);

// Init Body Parser middleware
app.use(express.json());

// Init middleware for Form submissions
app.use(express.urlencoded({ extended: false }));

// Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Homepage using Handlebars
app.get("/", (req, res) => {
  res.render("index", {
    title: "Member App",
    members,
  });
});

// Set a static server for a folder
// app.use(express.static(path.join(__dirname, "public")));

// Return basic data
// app.get("/", (req, res) => {
//   res.send("<h1>Hello World Logu!!</h1>");
//   // res.sendFile(path.join(__dirname, 'public/index1.html'));
// });

// Serve a html
// app.get("/html", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/index.html"));
// });

// Members API Route
app.use("/api/members", membersAPI);

// Listen on a port
app.listen(5000, () => console.log("Listening on port 5000"));
