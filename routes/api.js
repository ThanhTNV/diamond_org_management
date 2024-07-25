const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

/// CUSTOMERS ROUTES ///

// GET /api/customers
router.get("/customers", customerController.getAllCustomers);

// POST /api/customers
router.post("/customers", customerController.addACustomer);

// GET /api/customers/phone/:phone
router.get("/customers/phone/:phone", customerController.getOneCustomerByPhone);

// GET /api/customers/:id
router.get("/customers/:id", customerController.getOneCustomerById);

// PUT /api/customers/:id
router.put("/customers/:id", customerController.updateACustomer);

// DELETE /api/customers/:id
router.delete("/customers/:id", customerController.deleteACustomer);

//
//
//
//
/// STAFF ROUTES ///

// POST /api/staff
router.post("/staff", (req, res) => {
  res.json({ message: "POST /api/staff" });
});

// GET /api/staff/:id
router.get("/staff/:id", (req, res) => {
  res.json({ message: "GET /api/staff/:id" });
});

// PUT /api/staff/:id
router.put("/staff/:id", (req, res) => {
  res.json({ message: "PUT /api/staff/:id" });
});

// DELETE /api/staff/:id
router.delete("/staff/:id", (req, res) => {
  res.json({ message: "DELETE /api/staff/:id" });
});

//
//
//
//
/// DISCOUNT ROUTES ///

// GET /api/discount
router.get("/discount", (req, res) => {
  res.json({ message: "GET /api/discount" });
});

// POST /api/discount
router.post("/discount", (req, res) => {
  res.json({ message: "POST /api/discount" });
});

// GET /api/discount/:id
router.get("/discount/:id", (req, res) => {
  res.json({ message: "GET /api/discount/:id" });
});

// PUT /api/discount/:id
router.put("/discount/:id", (req, res) => {
  res.json({ message: "PUT /api/discount/:id" });
});

// DELETE /api/discount/:id
router.delete("/discount/:id", (req, res) => {
  res.json({ message: "DELETE /api/discount/:id" });
});

//
//
//
//
/// BILL ROUTES ///

// GET /api/bill
router.get("/bill", (req, res) => {
  res.json({ message: "GET /api/bill" });
});

// POST /api/bill
router.post("/bill", (req, res) => {
  res.json({ message: "POST /api/bill" });
});

// GET /api/bill/:id
router.get("/bill/:id", (req, res) => {
  res.json({ message: "GET /api/bill/:id" });
});

// PUT /api/bill/:id
router.put("/bill/:id", (req, res) => {
  res.json({ message: "PUT /api/bill/:id" });
});

// DELETE /api/bill/:id
router.delete("/bill/:id", (req, res) => {
  res.json({ message: "DELETE /api/bill/:id" });
});

//
//
//
//
/// DIAMOND ROUTES ///

// GET /api/diamond
router.get("/diamond", (req, res) => {
  res.json({ message: "GET /api/diamond" });
});

// POST /api/diamond
router.post("/diamond", (req, res) => {
  res.json({ message: "POST /api/diamond" });
});

// GET /api/diamond/:id
router.get("/diamond/:id", (req, res) => {
  res.json({ message: "GET /api/diamond/:id" });
});

// PUT /api/diamond/:id
router.put("/diamond/:id", (req, res) => {
  res.json({ message: "PUT /api/diamond/:id" });
});

// DELETE /api/diamond/:id
router.delete("/diamond/:id", (req, res) => {
  res.json({ message: "DELETE /api/diamond/:id" });
});

//
//
//
//
/// DIAMOND PRODUCT ROUTES ///

// GET /api/diamondProduct
router.get("/diamondProduct", (req, res) => {
  res.json({ message: "GET /api/diamondProduct" });
});

// POST /api/diamondProduct
router.post("/diamondProduct", (req, res) => {
  res.json({ message: "POST /api/diamondProduct" });
});

// GET /api/diamondProduct/:id
router.get("/diamondProduct/:id", (req, res) => {
  res.json({ message: "GET /api/diamondProduct/:id" });
});

// PUT /api/diamondProduct/:id
router.put("/diamondProduct/:id", (req, res) => {
  res.json({ message: "PUT /api/diamondProduct/:id" });
});

// DELETE /api/diamondProduct/:id
router.delete("/diamondProduct/:id", (req, res) => {
  res.json({ message: "DELETE /api/diamondProduct/:id" });
});

//
//
//
//
/// BILL DETAIL ROUTES ///

// GET /api/billDetail
router.get("/billDetail", (req, res) => {
  res.json({ message: "GET /api/billDetail" });
});

// POST /api/billDetail
router.post("/billDetail", (req, res) => {
  res.json({ message: "POST /api/billDetail" });
});

// GET /api/billDetail/:id
router.get("/billDetail/:id", (req, res) => {
  res.json({ message: "GET /api/billDetail/:id" });
});

// PUT /api/billDetail/:id
router.put("/billDetail/:id", (req, res) => {
  res.json({ message: "PUT /api/billDetail/:id" });
});

// DELETE /api/billDetail/:id
router.delete("/billDetail/:id", (req, res) => {
  res.json({ message: "DELETE /api/billDetail/:id" });
});

module.exports = router;
