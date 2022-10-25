const CarritosDaos = require("./carritosDaos")
const CarritosSchema = require('../carritos/carritosModel');

class CarritosServices {
  constructor() {
    this.carritosDaos = new CarritosDaos(CarritosSchema);
  }

  guardarCarritosService = async (carrito) => {
    const newCarrito = new CarritosSchema(carrito);
    const resultado = await this.carritosDaos.save(newCarrito);
    return resultado
  };

  getAllCarritosService = async () => {
    const carritos = await this.carritosDaos.getAllData();
    return carritos;
  };

  getCarritosByIdServices = async (id) => {
    const carritoById = await this.carritosDaos.getById(id);
    return carritoById;
  };

  delteCarritosByIdService = async (id) => {
    const carritoEliminado = await this.carritosDaos.deleteById(id)
    return carritoEliminado;
  };

  updateCarritoByIdService = async (id, carrito) => {
    const idCarritoActualizado = await this.carritosDaos.upDate(id, carrito);
    return idCarritoActualizado;
  };

  addProductoToCarritoService = async (producto, idCarrito, idProducto) => {
    const carrito = await this.carritosDaos.getById(idCarrito);

    const { precio, fotoUrl, codigo, descripcion, nombre, _id } = producto;

    const productoToAdd = { precio, fotoUrl, codigo, descripcion, nombre, _id };

    if (carrito) {
      const indexProducto = carrito.productos.findIndex(prod => prod._id == idProducto)
      if (!(indexProducto == -1)) {
        carrito.productos[indexProducto].cantidad++;
        const carritoToUpdate = await this.carritosDaos.upDate(idCarrito, carrito);
        return carritoToUpdate.id;
      } else {
        productoToAdd.cantidad = 1;
        carrito.productos.push(productoToAdd);
        const carritoToUpdate = await this.carritosDaos.upDate(idCarrito, carrito);
        return carritoToUpdate.id;
      };


    };




    // if (idCarrito) {
    //   carrito.productos.push(producto);
    //   const carritoToUpdate = await this.carritosDaos.upDate(idCarrito, carrito);
    //   return carritoToUpdate.id;
    // };
  };
};

module.exports = CarritosServices;

