var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Nota = mongoose.model('Nota');


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

module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.tipo_usuario = 'alumno';

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

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};
