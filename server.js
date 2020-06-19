// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/api/timestamp/:time", (req, res) => {
  var time = req.params.time;
  if (/\d{4}-\d{2}-\d{2}/.test(time)) {
    res.json({
      unix: new Date(time).getTime(),
      utc: new Date(time).toUTCString()
    });
  } else if (/\D/.test(time) == false) {
    res.json({
      unix: parseInt(time),
      utc: new Date(parseInt(time)).toUTCString()
    });
  } else {
    res.json({ error: "Invalid Date" });
  }
});
app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
});
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)

// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
