const mongoose = require('mongoose');


const ordenesSchema = mongoose.Schema(
  {
    productos: [{
      productoNombre: { type: String },
      cantidad: { type: Number }
    }],
    emailUsuario: { type: String },
    estado: { type: String, default: "generada" },
    numeroOrden: { type: Number, unique: true }
  },
  { timestamps: true }
);

ordenesSchema.pre("save", async function (next) {
  try {
    let ultimaOrden = await Ordenes.find({}).sort({ "numeroOrden": -1 }).limit(1);
    if (ultimaOrden.length == 0) {
      this.numeroOrden = 0;
      return next();
    };
    let numeroOrden = ultimaOrden[0].numeroOrden + 1;
    this.numeroOrden = numeroOrden;
    return next();
  } catch (error) {
    return next(error);
  }
});


const Ordenes = mongoose.model('Ordenes', ordenesSchema);

module.exports = Ordenes;


