const jwt = require('jsonwebtoken');
const { TOKEN_SECRETO } = require('../../../config/configIndex');
const UsuariosServices = require('./usuariosServices');

class UsuariosController {

  constructor() {
    this.UsuarioServices = new UsuariosServices();
  }

  guardarUsuarioController = async (req, res) => {
    try {
      const { email, password, passwordValidacion, direccion, numeroTelefono } = req.body

      const id = await this.UsuarioServices.guardarUsuarioService(
        {
          email,
          password,
          passwordValidacion,
          direccion,
          numeroTelefono
        });

      if (id) return res.status(200).redirect('/api/usuarios/iniciarSesion')
      else throw new Error(id);

    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };
  };

  iniciarSesionController = async (req, res) => {
    try {
      const { email, password } = req.body

      const usuario = await this.UsuarioServices.inciarSesionService(email, password)

      const token = jwt.sign(
        { usuario: usuario._id, email: usuario.email },
        TOKEN_SECRETO,
        {
          expiresIn: "2h",
        }
      );

      res.cookie("token", token, {
        httpOnly: true
      })
      return res.redirect('/api/productos/')
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };
  };


  getUsuariosController = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        const usuario = await this.UsuarioServices.getUsuarioByIdServices(id);
        if (usuario) return res.status(200).json(usuario);
        else return res.status(404).json({ message: "No se encontro el usuario" });

      } else {
        const usuarios = await this.UsuarioServices.getAllUsuariosService();
        // if (usuarios) return res.status(200).json(usuarios);
        if (usuarios) return res.status(200).render('listaUsuarios', { usuarios });
        else return res.status(404).json({ message: "No se encontraron usuarios" });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };
  };

  borrarUsuarioController = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        const usuarioEliminado = await this.UsuarioServices.delteUsuarioByIdService(id);
        if (usuarioEliminado) return res.status(200).json(usuarioEliminado);
        else return res.status(404).json({ message: "No se encontro el usuario" });
      };
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };

  actualizarUsuarioByIdController = async (req, res) => {
    try {
      const id = req.params.id;
      const { nombre, descripcion, codigo, fotoUrl, precio, stock } = req.body;

      if (id) {
        const idUsuarioActualizado = await this.UsuarioServices.updateUsuarioByIdService(
          id,
          {
            nombre,
            descripcion,
            codigo,
            fotoUrl,
            precio,
            stock
          });

        if (idUsuarioActualizado) return res.status(200).json(id);
        else return res.status(404).json({ message: "No se encontro el usuario" });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };
  };

  getUsuariosByCategoriaController = async (req, res) => {
    try {
      const categoria = req.params.categoria;

      if (categoria) {
        const usuariosCategoria = await this.UsuarioServices.getUsuariosByCategoria(categoria);
        // if (usuariosCategoria) return res.status(200).json(usuariosCategoria);
        if (usuariosCategoria) return res.status(200).render('listaUsuarios', { usuarios: usuariosCategoria });

        else return res.status(404).json({ message: "No se encontro el usuario" });

      };
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };
  };


  getImagenUsuariosById = async (req, res) => {
    try {
      const usuarioId = req.params.usuarioId;

      if (usuarioId) {
        const imagen = await this.UsuarioServices.getImagenUsuariosById(usuarioId);
        if (imagen) return res.status(200).json({ imagen });
        else return res.status(404).json({ message: "No se encontro el usuario" });
      };
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };
  };


  getVistaRegistro = (_, res) => {
    res.render('registrarUsuario');
  };

}
module.exports = UsuariosController;