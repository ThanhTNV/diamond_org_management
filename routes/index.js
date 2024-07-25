var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Diamond Organization Management', user: req.user });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/logout', function(req, res, next) {
  req.logout((err) => {
    if (err) {
      return res.json({ message: "Logout failed" });
    }
  });
  res.render('index', {title: 'Diamond Organization Management'});
});

module.exports = router;
