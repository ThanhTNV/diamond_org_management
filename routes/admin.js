var express = require('express');
var router = express.Router();

const userAccountController = require('../controllers/userAccountController');

// GET request for user account list
router.get('/', userAccountController.GetAllUserAccounts);

// POST request for user account creation
router.post('/signup', userAccountController.SignUpUserAccount);

// GET request for user account deletion
router.get('/remove/:id', userAccountController.RemoveUserAccount);

module.exports = router;