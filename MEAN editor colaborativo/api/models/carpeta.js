var mongoose = require( 'mongoose' );
var User = mongoose.model('User');
var Schema = mongoose.Schema;
var carpetaSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  nombre_carpeta: {
    type: String,
    required: true
  },
  archivos:
  [{Nombre:String,data:Buffer,modificacion:String}],
  participantes:
    [{type:String}]
});

mongoose.model('carpeta', carpetaSchema);
