var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//notas
router.post('/nota',ctrlAuth.notas);
router.post('/guardarNota',ctrlAuth.guardarNota);
router.post('/eliminarNota',ctrlAuth.eliminarNota);

module.exports = router;