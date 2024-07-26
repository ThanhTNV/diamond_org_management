const userAccountDAO = require("../models/DAO/userAccountDAO");
const LocalStrategy = require("passport-local").Strategy;
const asyncHandler = require("express-async-handler");

exports.localStrategy = new LocalStrategy(
  asyncHandler(async (username, password, done) => {
    const user = await userAccountDAO.getUserAccount(username, password);
    console.log(user);

    if (user === null) {
      return done(null, false, {
        message: "Incorrect username or password",
      });
    }
    return done(null, user);
  })
);

exports.deserializeUser = asyncHandler(async (id, done) => {
  const user = await userAccountDAO.getUserAccountById(id);
  done(null, user);
});

exports.serializeUser = asyncHandler(async (user, done) => {
  done(null, user.id);
});
