const asyncHandler = require("express-async-handler");
const { body, param, query, validationResult } = require("express-validator");
const userAccountDAO = require("../models/DAO/userAccountDAO");

// @desc    Authenticate a user
// @route   POST /login/
// @access  Public
exports.UserAccountLogin = [
  body("username").isAlphanumeric().escape(),
  body("password").isAlphanumeric().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await userAccountDAO.getUserAccount(req.body.username, req.body.password);
    if (user) {
      res.json({ message: "Login successful" });
    } else {
      res.json({ message: "Login failed" });
    }
  }),
];