// const express = require("express");
// const router = express.Router();
// const userAccountDAO = require("../models/DAO/userAccountDAO");
// const session = require("express-session");
// const passport = require("passport");
// const expressAsyncHandler = require("express-async-handler");
// const LocalStrategy = require("passport-local").Strategy;
// // Passport setup
// app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
// app.use(passport.session());
// app.use(express.urlencoded({ extended: false }));

// passport.use(
//   new LocalStrategy(
//     expressAsyncHandler(async (username, password, done) => {
//       const user = await userAccountDAO.getUserAccount(username, password);

//       if (!user) {
//         return done(null, false, {
//           message: "Incorrect username or password",
//         });
//       }
//       return done(null, user);
//     })
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(
//   expressAsyncHandler(async (id, done) => {
//     const user = await userAccountDAO.getUserAccountById(id);
//     done(null, user);
//   })
// );

// passport.authenticate("local"),
//   {
//     failureRedirect: "/login",
//     failureFlash: true,
//   };


// module.exports = passport.authenticate;
