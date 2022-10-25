const express = require('express');
const MensajesController = require('./mensajesController');
const router = express.Router();


const mensajesController = new MensajesController();

router.post('/', mensajesController.guardarMensajesController);

router.get('/:id?', mensajesController.getMensajesController);

router.delete('/:id', mensajesController.borrarMensajesController);



module.exports = router;