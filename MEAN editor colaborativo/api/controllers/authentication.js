var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Sesion = mongoose.model('sesion');
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

module.exports.getReadOnlyID = function(req,res) {
  etherpad.getReadOnlyID({padID:req.body.pad_id},(error,data)=>{
    console.log(data);
    res.status(200);
    res.send(data);
  });
}

module.exports.entrarSesion = function(req,res) {
  Sesion.update({ id_sesion: req.body.id_sesion }, { $push: { participantes: req.body.id_usuario } },(err,response)=>{
    if(err){
      console.log('ERROR AL ENTRAR Sesion')
      res.status(400);
    }
    console.log(response);
    res.status(200);
    res.send(response);
  });
}

module.exports.modificarPermiso = function(req,res) {
  console.log(req.body.modalidad + ' '+ req.body.id_sesion +' '+req.body.id_usuario);
  if(req.body.modalidad){
    Sesion.update({ _id: req.body.id_sesion }, { $push: { editores: req.body.id_usuario } },(err,response)=>{
      console.log(response);
      etherpad.getReadOnlyID({padID:req.body.nombre_sesion},(error,data)=>{
        console.log(data);
        res.status(200);
        res.send(data);
      });
    });
    console.log('verdad');
  }
  else{
    Sesion.update({_id:req.body.id_sesion},{ $pullAll: { editores: [req.body.id_usuario] } },(err,response)=>{
      console.log(response);
      etherpad.getReadOnlyID({padID:req.body.nombre_sesion},(error,data)=>{
        console.log(data);
        res.status(200);
        res.send(data);
      });
    });
    console.log('mentira');
  }

}

module.exports.obtenerSesion = function(req,res) {
  console.log('se realiza peticion en el serivdor');
  Sesion.
  findOne({ id_sesion: req.body.id_sesion }).
  populate('participantes').populate('editores').
  exec(function (err, sesion) {
    if (err) return handleError(err);
    console.log(sesion);
    res.status(200);
    res.send(sesion)
  });

  /*Sesion.find({id_sesion:req.body.id_sesion},(err,docs)=>{
    res.status(200);
    res.send(docs);
  })*/
}

module.exports.eliminarDeSesion = function(req,res) {
  Sesion.update({_id:req.body.id_sesion},{ $pullAll: { participantes: [req.body.id_user] } },(err,response)=>{
    console.log(response);
    res.status(200);
    res.send(response);
  });
}

module.exports.obtenerSesiones = function(req,res) {
  console.log('se realiza peticion en el serivdor');
  Sesion.find({},(err,docs)=>{
    res.status(200);
    res.send(docs);
  })
}

module.exports.eliminarSesion = function(req,res) {
  console.log(req.body.id_sesion);
  Sesion.deleteOne({ _id: req.body.id_sesion }, function (err,doc) {
  if (err){
    return handleError(err)
  }else{
    res.status(200);
    res.send(doc);
  }

});
}

module.exports.sesionOwnerOrPart = function(req,res){
  console.log(req.body);
  Sesion.find({email:req.body.email},(err,docs)=>{
    if(docs.length == 0){
      Sesion.find({participantes:req.body.id},(err,docs)=>{
        res.status(200);
        res.send(docs);
      });
    }else if(docs.length == 1){
      res.status(200);
      res.send(docs);
    }
    console.log(docs.length);
  })
}

module.exports.crearSesion = async function(req,res){
  var sesion = new Sesion();
  var User = mongoose.model('User');

   User.find({email:req.body.email},(err,data)=>{
    var data1 = JSON.stringify(data);
    console.log(data[0].email);
    var args = {
      padID: req.body.id_sesion
    };
    etherpad.createPad(args,(error,data)=>{
      if(error){
        console.error('Error al crear pad: ' + error.message);
        res.status(400);
      }
      else{
        console.log('New pad created: ' + data);
      }
    });
    console.log('IMPRIMIENDO REQ BODY\n\n'+req.body.id_sesion);
    var sesion = new Sesion({
      id_sesion: req.body.id_sesion,
      nombre_sesion:req.body.nombre_sesion,
      email:req.body.email,
      privacidad: req.body.privacidad,
      id_pad:req.body.id_sesion
    });
    sesion.participantes.push(data[0]._id)
    sesion.save((err)=>{
      if (err){
        res.status(200);
        var respuesta = {head:err,mssg:err};
        res.send(respuesta);
      }
      else{
        res.status(200);
        var respuesta = {head:sesion,mssg:'bien'};
        res.send(respuesta);
      }
    });

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
