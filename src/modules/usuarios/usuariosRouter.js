const express = require('express');

const passport = require('passport');

const router = express.Router();
const UsuariosController = require('./usuariosControllers');

const usuarioConstroller = new UsuariosController();

router.post('/registro', usuarioConstroller.guardarUsuarioController)
router.get('/registro', usuarioConstroller.getVistaRegistro)

router.post('/iniciarSesion', usuarioConstroller.iniciarSesionController)

router.get('/iniciarSesion', (req, res) => {

  res.render("iniciarSesion")
});

router.get('/testToken', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(req.user);
})




module.exports = router;