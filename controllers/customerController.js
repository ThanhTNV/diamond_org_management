const asyncHandler = require("express-async-handler");
const { body, param, query, validationResult } = require("express-validator");
const customerDAO = require("../models/DAO/customerDAO");
const { CustomerDTO } = require("../models/DTO/CustomerDTO");

// @desc    Get all customers
// @route   GET /api/customers
// @access  Public
exports.getAllCustomers = asyncHandler(async (req, res, next) => {
  const customers = await customerDAO.getAllCustomers();
  res.json(customers);
});

// @desc    Get a customer by ID
// @route   GET /api/customers/:id
// @access  Public
exports.getOneCustomerById = [
  param("id").isInt().toInt(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const customer = await customerDAO.GetOneCustomerById(req.params.id);
    res.json(customer);
  }),
];

// @desc    Get a customer by Phone
// @route   GET /api/customers/phone/:phone
// @access  Public
exports.getOneCustomerByPhone = [
  param("phone").isMobilePhone().isLength({ min: 10, max: 10 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const customer = await customerDAO.GetOneCustomerByPhone(req.params.phone);
    res.json(customer);
  }),
];

// @desc    Add a customer
// @route   POST /api/customers
// @access  Public
exports.addACustomer = [
  body("ID").isInt().toInt(),
  body("Phone").isMobilePhone().isLength({ min: 10, max: 10 }).escape(),
  body("FirstName").isAlphanumeric().escape(),
  body("LastName").isAlphanumeric().escape(),
  body("Point").isInt().toInt(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newCustomer = new CustomerDTO();
    newCustomer.ID = req.body.ID;
    newCustomer.Phone = req.body.Phone;
    newCustomer.FirstName = req.body.FirstName;
    newCustomer.LastName = req.body.LastName;
    newCustomer.Point = req.body.Point;

    await customerDAO.AddACustomer(newCustomer);
    res.json({ message: "Customer added" });
  }),
];

// @desc    Update a customer
// @route   PUT /api/customers/:id
// @access  Public
exports.updateACustomer = [
  param("id").isInt().toInt(),
  body("Phone").isMobilePhone().isLength({ min: 10, max: 10 }).escape(),
  body("FirstName").isAlphanumeric().escape(),
  body("LastName").isAlphanumeric().escape(),
  body("Point").isInt().toInt(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updatedCustomer = new CustomerDTO();
    updatedCustomer.ID = req.params.id;
    updatedCustomer.Phone = req.body.Phone;
    updatedCustomer.FirstName = req.body.FirstName;
    updatedCustomer.LastName = req.body.LastName;
    updatedCustomer.Point = req.body.Point;

    await customerDAO.UpdateACustomer(updatedCustomer.ID, updatedCustomer);
    res.json({ message: "Customer updated" });
  }),
];

// @desc    Delete a customer
// @route   DELETE /api/customers/:id
// @access  Public
exports.deleteACustomer = [
  param("id").isInt().toInt(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await customerDAO.DeleteACustomer(req.params.id);
    res.json({ message: "Customer deleted" });
  }),
];
