const asyncHandler = require("express-async-handler");
const { body, param, query, validationResult } = require("express-validator");
const userAccountDAO = require("../models/DAO/userAccountDAO");

exports.SignUpUserAccount = [
  body("username").escape(),
  body("password").escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newUser = await userAccountDAO.getUserAccountByUsername(
      req.body.username
    );

    if (newUser !== null) {
      return res.json({ message: "User already exists", status: 400 });
    }

    const user = await userAccountDAO.addUserAccount(
      req.body.username,
      req.body.password
    );
    if (user) {
      res.json({ message: "User created", status: 200 });
    } else {
      res.json({ message: "User creation failed", status: 400 });
    }
  }),
];

exports.RemoveUserAccount = [
  param("id").escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await userAccountDAO.getUserAccountById(req.params.id);
    if (!user) {
      return res.json({ message: "User not found", status: 400 });
    }

    const deletedUser = await userAccountDAO.removeUserAccount(req.params.id);
    if (deletedUser) {
      res.json({ message: "User deleted", status: 200 });
    } else {
      res.json({ message: "User deletion failed", status: 400 });
    }
  }),
];

exports.GetAllUserAccounts = asyncHandler(async (req, res, next) => {
  const users = await userAccountDAO.showAllUserAccounts();
  if (users) {
    res.json({ users: users, status: 200 });
  } else {
    res.json({ message: "No users found", status: 400 });
  }
});
