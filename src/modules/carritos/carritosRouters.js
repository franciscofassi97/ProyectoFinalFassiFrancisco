const express = require('express');
const CarritosController = require('./carritosControllers');
const router = express.Router();


const carritosController = new CarritosController();

router.post('/', carritosController.guardarCarritosController);

router.get('/:id?', carritosController.getCarritosController);

router.delete('/:id', carritosController.borrarCarritosController);

router.put('/:id/productos', carritosController.addProductoToCarritoController);

module.exports = router;
