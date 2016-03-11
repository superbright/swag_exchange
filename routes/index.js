var express = require('express');
var _ = require('lodash');

var router = express.Router();

var numTiers = 4;

router.get('/view/cats', function (req, res, next) {
  var categories = req.db.get('categories');
  categories.find({}, { sort: { count: -1 } }, function(err, docs) {
    res.json(docs);
  });
});

router.get('/view/inv', function (req, res, next) {
  var inventory = req.db.get('inventory');
  inventory.find({}, {}, function(err, docs) {
    res.json(docs);
  });
});

var bias_chance = 0.75; // 75% chance of bias

router.post('/swag_types_submit', function(req, res) {
    var catNames = req.body.categories.split(',');
    var categories = req.db.get('categories');
    // sort highest item count to lowest
    categories.find({}, { sort: { count: -1 } }, function(err, docs) {
      // get position in the list - lowest position = more items = shitty
      var catValues = _.map(catNames, function (n) { return _.findIndex(docs, { name: n }); });
      // get the highest position/rarest category and normalize to [0,1] range
      var normalized = _.max(catValues) / docs.length;
      // calculate tier
      var tier = 1 + Math.round(normalized * numTiers);
      if (_.random(true) < bias_chance && tier > 1) {
        tier--;
        console.log('tier downgraded to ' + tier);
      }

      categories.update({ name: { $in: catNames } }, { $inc: { count: 1 }}, function (err) {
        // make sure our we have items available in that tier
        var inventory = req.db.get('inventory');
        inventory.col.aggregate(
          [{ $match: { "qty" : { $gt: 0 } } }
          ,{ $group: { "_id": "$tier", "count": { $sum: 1 } } }]
          ,function (err, results) {

          var tierInv = _(results)
            .map(function (o) { return [o._id, o.count]; })
            .fromPairs()
            .value();

          var origTier = tier;
          while (tier > 0 && !_.has(tierInv, tier)) {
            console.log('tier ' + tier + ' empty')
            --tier;
          }
          if (tier == 0) {
            tier = origTier;
            while (tier <= 4 && !_.has(tierInv, tier)) {
              console.log('tier ' + tier + ' empty')
              ++tier;
            }
          }

          res.render('swag_final', { tier: tier });
      });
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
    var byTier = _.groupBy(docs, 'tier');
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
