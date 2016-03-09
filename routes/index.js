var express = require('express');
var _ = require('lodash');

var router = express.Router();

var numTiers = 4;

router.post('/swag_types_submit', function(req, res) {
  console.log(req.body);
    var catName = req.body.category;
    var categories = req.db.get('categories');
    categories.find({}, { sort: { count: -1 } }, function(err, docs) {
      var tier = 1 + Math.round((_.findIndex(docs, { name: catName }) / docs.length) * numTiers);

      categories.update({ name: catName }, { $inc: { count: 1 }}, function (err) {
        res.render('swag_final', { tier: tier });
      });
    });
});

router.get('/swag_types', function(req, res, next) {
  res.render('swag_types', { title: 'SWAG' });
});

router.post('/swag_final', function(req, res, next) {
  res.render('swag_final', { title: 'SWAG' });
});

router.get('/animation', function(req, res, next) {
  res.render('animation', { title: 'SWAG' });
});

// populate dropdown according to inventory, submit and update inventory
router.get('/swag_ticket_return', function(req, res, next) {
  var inventory = req.db.get('inventory');
  inventory.find({ qty: { $gt: 0 }}, {}, function(err, docs) {
    var byTier = _(docs)
      .groupBy('tier')
      .mapValues(function(t) { return _.map(t, _.property('name')); })
      .value();
    console.log(byTier[4]);
    res.render('swag_ticket_return', {
      title: 'SWAG',
      tier1: byTier[1],
      tier2: byTier[2],
      tier3: byTier[3],
      tier4: byTier[4]
    });
  });
});

router.post('/swag_ticket_submit', function(req, res) {
  var itemName = req.body.item;
  var inventory = req.db.get('inventory');
  inventory.update({ name: itemName }, { $inc: { qty: -1 }}, function (err) {
    res.redirect('/return');
  });
});

router.get('/return', function(req, res, next) {
  res.render('return', { title: 'SWAG' });
});

module.exports = router;
