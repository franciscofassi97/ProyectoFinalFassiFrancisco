const express = require('express');

const OrdenesController = require('./ordenesControllers');
const router = express.Router();


const ordenesController = new OrdenesController();

router.post('/', ordenesController.guardarOrdenController);

// router.get('/:id?', productosController.getProductosController);

// router.get('/categoria/:categoria', productosController.getProductosByCategoriaController);

// router.get('/images/:productoId', productosController.getImagenProductosById)


// router.delete('/:id', productosController.borrarProductoController);

// router.put('/:id', productosController.actualizarProductoByIdController);
module.exports = router;
