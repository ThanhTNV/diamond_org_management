// This file is the main entry point for the application
var createError = require("http-errors");
// Express import
var express = require("express");
var app = express();
// Path import
var path = require("path");
// Cookie parser import
var cookieParser = require("cookie-parser");
// Logger import
var logger = require("morgan");
// Passport authenticater import
const session = require("express-session");
const passport = require("passport");
const authenticater = require("./middlewares/authentication");

// Route imports
var indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");
const adminRouter = require("./routes/admin");

// Passport setup
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
// Passport authenticater setup
passport.use(authenticater.localStrategy);
passport.serializeUser(authenticater.serializeUser);
passport.deserializeUser(authenticater.deserializeUser);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Middleware use
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/// API LANDING PAGE ///
app.use("/", indexRouter);

// authenticate user before accessing the api
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
// API ROUTES
app.use(
  "/api",
  (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect("/login");
    }
  },
  apiRouter
);

// ADMIN ROUTES
app.use(
  "/admin",
  (req, res, next) => {
    if (!req.user) {
      res.json({ message: "No permission", status: 400 });
    }
    if (!req.user.username.includes("admin")) {
      res.json({ message: "No permission", status: 400 });
    }
    next();
  },
  adminRouter
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
