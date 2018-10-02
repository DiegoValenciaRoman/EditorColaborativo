var mongoose = require( 'mongoose' );
var notaSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  nota: {
    type: String,
    required: true
  },
});

mongoose.model('Nota', notaSchema);
