const mongoose = require('mongoose');


const productoSchema = mongoose.Schema(
  {
    nombre: { type: String, required: [true, "Inserte Nombre de producto"] },
    descripcion: { type: String, required: [true, "Inserte Descripcion de producto"] },
    codigo: { type: String, required: [true, "Inserte Codigo de producto"] },
    fotoUrlProducto: { type: String, required: [true, "Inserte Foto de producto"] },
    precio: { type: Number, required: [true, "Inserte Precio de producto"] },
    stock: { type: Number, required: [true, "Inserte Stock de producto"] },
    categoria: { type: String, required: [true, "Inserte Categoria de producto"] },
  },
  { timestamps: true }
)

const Productos = mongoose.model('productos', productoSchema);

module.exports = Productos;