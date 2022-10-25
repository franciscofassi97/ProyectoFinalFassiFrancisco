const mongoose = require('mongoose');

const mensajesSchema = new mongoose.Schema(
  {
    emailUsuario: { type: String },
    tipoUsuario: { type: String },
    cuerpoMensaje: { type: String }
  },
  { timestamps: true }
);

const Mensajes = mongoose.model('mensaje', mensajesSchema);

module.exports = Mensajes;