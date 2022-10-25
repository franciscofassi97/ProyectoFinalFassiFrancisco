const express = require('express');

const OrdenesController = require('./ordenesControllers');
const router = express.Router();


const ordenesController = new OrdenesController();

router.post('/', ordenesController.guardarOrdenController);

router.get('/:id?', ordenesController.getOrdenesController);

router.delete('/:id', ordenesController.borrarOrdeneController);
module.exports = router;
