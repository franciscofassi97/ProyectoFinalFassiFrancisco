const ProductosServices = require('../productos/productosServices');
const CarritosServices = require('./carritosServices');

class CarritosController {

  constructor() {
    this.CarritosServices = new CarritosServices();
  }

  guardarCarritosController = async (_, res) => {
    try {
      const carrito = {
        productos: [],
        emailUsuario: "",
        direccionEntrega: ""
      };

      const id = await this.CarritosServices.guardarCarritosService(carrito);

      return res.status(200).json({ idCarritos: id });

    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };
  };

  getCarritosController = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        const carrito = await this.CarritosServices.getCarritosByIdServices(id);
        if (carrito) return res.status(200).json(carrito);
        else return res.status(404).json({ message: "No se encontro el carrito" });

      } else {
        const carritos = await this.CarritosServices.getAllCarritosService();
        if (carritos) return res.status(200).json(carritos);

        else return res.status(404).json({ message: "No se encontraron carritos" });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };
  };

  borrarCarritosController = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        const carritoEliminado = await this.CarritosServices.delteCarritosByIdService(id);
        if (carritoEliminado) return res.status(200).json(carritoEliminado);
        else return res.status(404).json({ message: "No se encontro el carrito" });
      };
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };

  actualizarCarritosByIdController = async (req, res) => {
    try {
      const id = req.params.id;
      const { nombre, descripcion, codigo, fotoUrl, precio, stock } = req.body;

      if (id) {
        const idCarritoActualizado = await this.CarritosServices.updateCarritosByIdService(
          id,
          {
            nombre,
            descripcion,
            codigo,
            fotoUrl,
            precio,
            stock
          });

        if (idCarritoActualizado) return res.status(200).json(id);
        else return res.status(404).json({ message: "No se encontro el Carrito" });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };
  };

  addProductoToCarritoController = async (req, res) => {
    try {
      const idCarrito = req.params.id;
      const { idProducto } = req.body;
      const productoToAdd = await new ProductosServices().getProductoByIdServices(idProducto);
      if (productoToAdd) {
        let carrito = await this.CarritosServices.addProductoToCarritoService(productoToAdd, idCarrito, idProducto);
        return res.status(200).json(carrito);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };

  }
}
module.exports = CarritosController;