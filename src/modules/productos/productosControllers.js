const ProductosServices = require('./productosServices');

// const ProductoServices = new ProductosServices();

class ProductosController {

  constructor() {
    this.ProductoServices = new ProductosServices();
  }

  guardarProductoController = async (req, res) => {
    try {
      const { nombre, descripcion, codigo, precio, stock, categoria } = req.body
      const fotoUrlProducto = req.file.path;

      const id = await this.ProductoServices.guardarProductoService({
        nombre,
        descripcion,
        codigo,
        fotoUrlProducto: fotoUrlProducto.split("public")[1],
        precio,
        stock,
        categoria
      });

      if (id) res.status(200).redirect('/api/productos')
      else throw new Error(id);
      // return res.status(200).json({ idProducto: id });

    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };
  };

  getProductosController = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        const producto = await this.ProductoServices.getProductoByIdServices(id);
        if (producto) return res.status(200).json(producto);
        else return res.status(404).json({ message: "No se encontro el producto" });

      } else {
        const productos = await this.ProductoServices.getAllProductosService();
        // if (productos) return res.status(200).json(productos);
        if (productos) return res.status(200).render('listaProductos', { productos });
        else return res.status(404).json({ message: "No se encontraron productos" });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };
  };

  borrarProductoController = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        const productoEliminado = await this.ProductoServices.delteProductoByIdService(id);
        if (productoEliminado) return res.status(200).json(productoEliminado);
        else return res.status(404).json({ message: "No se encontro el producto" });
      };
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };

  actualizarProductoByIdController = async (req, res) => {
    try {
      console.log(req.params.id)
      const id = req.params.id;
      const { nombre, descripcion, codigo, precio, stock, categoria } = req.body;

      if (id) {
        const idProductoActualizado = await this.ProductoServices.updateProductoByIdService(
          id,
          {
            nombre,
            descripcion,
            codigo,
            fotoUrl,
            precio,
            stock,
            categoria
          });

        if (idProductoActualizado) return res.status(200).json(id);
        else return res.status(404).json({ message: "No se encontro el producto" });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };
  };

  getProductosByCategoriaController = async (req, res) => {
    try {
      const categoria = req.params.categoria;

      if (categoria) {
        const productosCategoria = await this.ProductoServices.getProductosByCategoria(categoria);
        // if (productosCategoria) return res.status(200).json(productosCategoria);
        if (productosCategoria) return res.status(200).render('listaProductos', { productos: productosCategoria });

        else return res.status(404).json({ message: "No se encontro el producto" });

      };
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };
  };


  getImagenProductosById = async (req, res) => {
    try {
      const productoId = req.params.productoId;

      if (productoId) {
        const imagen = await this.ProductoServices.getImagenProductosById(productoId);
        if (imagen) return res.status(200).json({ imagen });
        else return res.status(404).json({ message: "No se encontro el producto" });
      };
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };
  };

  getFormProductos = async (req, res) => {
    if (req.params.id) {
      const producto = await this.ProductoServices.getProductoByIdServices(req.params.id)
      return res.render('cargarProductos', { producto })
    }
    res.render('cargarProductos')
  }

}
module.exports = ProductosController;