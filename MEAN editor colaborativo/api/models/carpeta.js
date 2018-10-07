var mongoose = require( 'mongoose' );
var notaSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  nombre_carpeta: {
    type: String,
    required: true
  },
  archivos: {
    type: []
  },
  participantes: {
    type: []
  }
});

mongoose.model('Nota', notaSchema);
