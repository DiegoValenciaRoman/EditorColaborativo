var mongoose = require( 'mongoose' );
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
  participantes: {
    type: [String]
  },
  id_pad: {
    type: String
  },
  editores: {
    type: [String]
  }
});

mongoose.model('Sesion', sesionSchema);
