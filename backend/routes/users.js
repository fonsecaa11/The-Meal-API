var express = require('express');
var router = express.Router();

/* GET user profile */
router.get('/:id', function(req, res, next) {
  const userId = req.params.id;
  res.json({ id: userId, name: 'Example User', favorites: ['Spaghetti', 'Tacos'] });
});

/* POST user registration */
router.post('/register', function(req, res, next) {
  const { name, email, password } = req.body;
  res.status(201).json({ message: 'User registered successfully', user: { name, email } });
});

/* POST user login */
router.post('/login', function(req, res, next) {
  const { email, password } = req.body;
  if (email === 'test@example.com' && password === '1234') {
    res.json({ message: 'Login successful', token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
