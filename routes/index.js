var express = require('express');
var router = express.Router();

/* GET home page, animated url */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SWAG' });
});

// return tablepage
router.get('/return', function(req, res, next) {
  res.render('return', { title: 'SWAG' });
});

// swag category submission form
router.get('/swag', function(req, res, next) {
  res.render('swag_submit', { title: 'SWAG' });
});

router.post('/swag_submit', function(req, res) {
    var category = req.body.category;
    console.log(category);
   res.render('swag_submit', { title: 'SWAG' });
});

//user register post call
router.post('/user_register', function(req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    console.log(name);
   res.render('return', { title: 'SWAG' });
});

// return tablepage
router.get('/swag_types', function(req, res, next) {
  res.render('swag_types', { title: 'SWAG' });
});

// return tablepage
router.get('/swag_final', function(req, res, next) {
  res.render('swag_final', { title: 'SWAG' });
});

// return tablepage
router.get('/animation', function(req, res, next) {
  res.render('animation', { title: 'SWAG' });
});

module.exports = router;
