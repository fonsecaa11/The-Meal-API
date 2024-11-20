var express = require('express');
var router = express.Router();
const fetchFromMealDB = require('../services/externalAPI');

/* GET all recipes */
router.get('/', async function(req, res) {
  try {
    const data = await fetchFromMealDB('/search.php?s=');
    res.json(data.meals || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

/* GET a specific recipe by ID */
router.get('/:id', async function(req, res) {
  const recipeId = req.params.id;
  try {
    const data = await fetchFromMealDB(`/lookup.php?i=${recipeId}`);
    res.json(data.meals ? data.meals[0] : { error: 'Recipe not found' });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch recipe with id ${recipeId}` });
  }
});

/* GET recipes by category */
router.get('/category/:category', async function(req, res) {
  const category = req.params.category;
  try {
    const data = await fetchFromMealDB(`/filter.php?c=${category}`);
    res.json(data.meals || []);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch recipes in category ${category}` });
  }
});

/* GET recipes by ingredient */
router.get('/ingredient/:ingredient', async function(req, res) {
  const ingredient = req.params.ingredient;
  try {
    const data = await fetchFromMealDB(`/filter.php?i=${ingredient}`);
    res.json(data.meals || []);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch recipes with ingredient ${ingredient}` });
  }
});

/* GET recipes by area */
router.get('/area/:area', async function(req, res) {
  const area = req.params.area;
  try {
    const data = await fetchFromMealDB(`/filter.php?a=${area}`);
    res.json(data.meals || []);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch recipes in area ${area}` });
  }
});

/* GET random recipe */
router.get('/random', async function(req, res) {
  try {
    const data = await fetchFromMealDB('/random.php');
    res.json(data.meals ? data.meals[0] : { error: 'No random recipe found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch random recipe' });
  }
});

/* GET all categories */
router.get('/categories', async function(req, res) {
  try {
    const data = await fetchFromMealDB('/categories.php');
    res.json(data.categories || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

/* GET all areas */
router.get('/areas', async function(req, res) {
  try {
    const data = await fetchFromMealDB('/list.php?a=list');
    res.json(data.meals || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch areas' });
  }
});

module.exports = router;