var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dbo = require("./db/conn");

var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var registerRouter = require("./routes/register");
var stikersRouter = require("./routes/stikers");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public"),{ extensions: ['html'] }));

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);
app.use("/api/user/stickers", stikersRouter);

// perform a database connection when the server starts
dbo.connectToServer((err) => {
  if (err) {
    console.error(err);
    process.exit();
  }
});

module.exports = app;
