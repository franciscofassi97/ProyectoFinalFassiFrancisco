const OrdenesDaos = require("./ordenesDaos")
const OrdenesSchema = require('./ordenesModel');

class OrdenesServices {
  constructor() {
    this.ordenesDaos = new OrdenesDaos(OrdenesSchema);
  }

  guardarOrdenService = async (orden) => {
    const newOrden = new OrdenesSchema(orden);
    const resultado = await this.ordenesDaos.save(newOrden);
    return resultado;
  };

  getAllProductosService = async () => {
    const productos = await this.productoDaos.getAllData();
    return productos;
  };

  getOrdenByIdServices = async (id) => {
    const ordenById = await this.ordenesDaos.getById(id);
    return ordenById;
  };

  delteProductoByIdService = async (id) => {
    const prodcutoEliminado = await this.productoDaos.deleteById(id)
    return prodcutoEliminado;
  };

  updateProductoByIdService = async (id, producto) => {
    const idProductoActualizado = await this.productoDaos.upDate(id, producto);
    return idProductoActualizado;
  };

  getProductosByCategoria = async (categoria) => {
    const productosCategoria = await this.productoDaos.getProductosByCategoria(categoria)
    return productosCategoria;
  }


  getImagenProductosById = async (id) => {
    const producto = await this.productoDaos.getById(id);
    const imagenById = producto.fotoUrlProducto;
    return imagenById;
  }
};

module.exports = OrdenesServices;

