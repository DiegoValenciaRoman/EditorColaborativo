var mongoose = require( 'mongoose' );
var User = mongoose.model('User');
var Schema = mongoose.Schema;
var sesionSchema = new mongoose.Schema({
  id_sesion: {
    type: String,
    required: true
  },
  nombre_sesion: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  privacidad: {
    type: String
  },
  participantes:
    [{type:Schema.Types.ObjectId,ref:'User'}]
  ,
  id_pad: {
    type: String
  },
  editores: [{type:Schema.Types.ObjectId,ref:'User'}]

});

mongoose.model('sesion', sesionSchema);
