const ProductosDaos = require("./productosDaos")
const ProductosSchema = require('../productos/productosModel');

class ProductosServices {
  constructor() {
    this.productoDaos = new ProductosDaos(ProductosSchema);
  }

  guardarProductoService = async (producto) => {
    const newProducto = new ProductosSchema(producto);
    const resultado = await this.productoDaos.save(newProducto);
    return resultado
  };

  getAllProductosService = async () => {
    const productos = await this.productoDaos.getAllData();
    return productos;
  };

  getProductoByIdServices = async (id) => {
    const productoById = await this.productoDaos.getById(id);
    return productoById;
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

module.exports = ProductosServices;

