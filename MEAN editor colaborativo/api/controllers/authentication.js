var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Nota = mongoose.model('Nota');
var Nota = mongoose.model('Sesion');
//agregando requerimientos para trabajar con la api de etherpad y crear un pad personal cada vez que se registra un usuario
api = require('etherpad-lite-client')
etherpad = api.connect({
  apikey: '7de3631ba517f21cfe5fcbcde34ccc1c90da6b6944182d8e78b84457c140f9e8',
  host: 'localhost',
  port: 9001,
})

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


module.exports.notas = function(req,res) {
  console.log(req.body);
  Nota
  .find({email:req.body.email})
    .exec(function(err, user) {
      res.status(200).json(user);
    });

}

module.exports.eliminarNota = function(req,res) {
  console.log(req.body.notaid);
  Nota
  .findByIdAndRemove(req.body.notaid).exec(function(err, user) {
    res.status(200).json(user);
  });
}

module.exports.guardarNota = function(req,res) {
  var nota = new Nota();

  nota.email = req.body.email;
  nota.nota = req.body.nota;
  nota.save(function(err){
    console.log(nota);
    res.status(200);
    res.send(nota);
  });

}

//Sesiones
module.exports.crearSesion = async function(req,res){
  var sesion = new Sesion();
  sesion.id_sesion = req.body.id_sesion;
  sesion.nombre_sesion = req.body.nombre_sesion;
  sesion.email = req.body.email;
  sesion.privacidad = req.body.privacidad;
  sesion.participantes = [];
  sesion.editores = [];
  var id;
  var args = {
    padID: req.body.id_sesion;
  }
  await etherpad.createPad(args,(error,data)=>{
    if(error){
      console.error('Error al crear pad: ' + error.message);
      res.status(400);
    }
    else{
      console.log('New pad created: ' + data);
      console.log(id);
    }
  });
  sesion.id_pad = id;
  sesion.save(function(err){
    console.log(sesion);
    res.status(200);
    res.send(sesion);
  });


}

module.exports.register = async function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();
  var id;
  var args = {
    padID: req.body.email
  }
  await etherpad.createPad(args,(error,data)=>{
    if(error){
      console.error('Error al crear pad: ' + error.message);
      if (error.message = "padID does already exist") {
        id=req.body.email;
      }
    }
    else{
      console.log('New pad created: ' + data);
      console.log(id);
    }
  });
  console.log(id +'id antes de user');
  user.pad_usuario = req.body.email;
  console.log(user.pad_usuario+' pad usuario');
  user.name = req.body.name;
  user.email = req.body.email;
  //perimos 0 solo permite entrar a sesiones
  //permiso 1 permite al usuario crear sesiones, mas lo del permiso 0
  //permiso 2 permite al usuario tener una carpeta y guardar archivos, mas lo de permiso 0
  //permiso 3 permite al usuario hacer todo lo anterior
  user.permiso_usuario = 0;

  user.setPassword(req.body.password);

  user.save(function(err){
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

};

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // si passport cacht un error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // si se encuentra usuario
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // si no se encuentra usuario
      res.status(401).json(info);
    }
  })(req, res);

};
