var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const userAccountDAO = require("./models/DAO/userAccountDAO");
const session = require("express-session");
const passport = require("passport");
const expressAsyncHandler = require("express-async-handler");
const LocalStrategy = require("passport-local").Strategy;

// Route imports
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");

// Passport setup
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
passport.use(
  new LocalStrategy(
    expressAsyncHandler(async (username, password, done) => {
      const user = await userAccountDAO.getUserAccount(username, password);

      if (!user) {
        return done(null, false, {
          message: "Incorrect username or password",
        });
      }
      return done(null, user);
    })
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(
  expressAsyncHandler(async (id, done) => {
    const user = await userAccountDAO.getUserAccountById(id);
    done(null, user);
  })
);

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
    successRedirect: "/api",
    failureRedirect: "/",
  })
);
// API ROUTES
app.use(
  "/api",
  passport.authenticate("local", {
    successRedirect: "/api",
    failureRedirect: "/",
  }),
  apiRouter
);
// app.get("logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return res.json({ message: "Logout failed" });
//     }
//   });
//   res.json({ message: "Logout successful" });
// });

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
