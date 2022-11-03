const express = require('express');
const uploads = require('../../utils/multer/multer');
const ProductosController = require('./productosControllers');
const router = express.Router();
const passport = require('passport');
const verifyToken = require('../../middlewares/isAutenticated');

const productosController = new ProductosController();

router.get('/crear/:id?', productosController.getFormProductos);
router.post('/', uploads.single("fotoUrlProducto"), productosController.guardarProductoController);

router.get('/:id?', verifyToken, productosController.getProductosController);

router.get('/categoria/:categoria', productosController.getProductosByCategoriaController);

router.get('/images/:productoId', productosController.getImagenProductosById)


router.delete('/:id', productosController.borrarProductoController);

router.post('/:id', productosController.actualizarProductoByIdController);

module.exports = router;
