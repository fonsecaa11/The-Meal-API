var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  const featuredRecipes = [
    { id: 1, title: '', category: '' },
    { id: 2, title: '', category: '' },
  ];
  res.render('index', { title: 'Recipes for Everyone', featuredRecipes });
});

module.exports = router;
