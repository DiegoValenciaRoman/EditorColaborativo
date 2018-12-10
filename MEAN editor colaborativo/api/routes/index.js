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

//sesiones
router.post('/crearSesion',ctrlAuth.crearSesion);
router.post('/obtenerSesiones',ctrlAuth.obtenerSesiones);
router.post('/sesionOwnerOrPart',ctrlAuth.sesionOwnerOrPart);
router.post('/obtenerSesion',ctrlAuth.obtenerSesion);
router.post('/eliminarDeSesion',ctrlAuth.eliminarDeSesion);
router.post('/eliminarSesion',ctrlAuth.eliminarSesion);
router.post('/entrarSesion',ctrlAuth.entrarSesion);
router.post('/modificarPermiso',ctrlAuth.modificarPermiso);
router.post('/getReadOnlyID',ctrlAuth.getReadOnlyID);

//Carpeta de archivos
router.post('/guardarArchivo',ctrlAuth.guardarArchivo);
router.post('/obtenerCarpeta',ctrlAuth.obtenerCarpeta);
router.post('/darPermisoCarpeta',ctrlAuth.darPermisoCarpeta);

module.exports = router;
