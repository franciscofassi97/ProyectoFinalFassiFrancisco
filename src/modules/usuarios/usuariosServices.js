const UsuariosDaos = require("./usuariosDaos")
const UsuariosSchema = require('../usuarios/usuariosModel');
const bcrypt = require('bcrypt');



class UsuariosServices {
  constructor() {
    this.usuarioDaos = new UsuariosDaos(UsuariosSchema);
  }

  guardarUsuarioService = async (usuario) => {
    try {
      const { email, password, passwordValidacion } = usuario;

      if (await this.usuarioDaos.existeUsuario(email)) throw new Error("Ya existe un usuario");

      if (password !== passwordValidacion) throw new Error("password no coiciden");

      const newUsuarios = new UsuariosSchema(usuario);
      const resultado = await this.usuarioDaos.save(newUsuarios);
      return resultado

    } catch (error) {
      throw new Error(error);
    }
  };

  inciarSesionService = async (email, password) => {
    try {

      const usuario = await this.usuarioDaos.findByEmail(email)

      if (!usuario || !(await bcrypt.compareSync(password, usuario.password)))
        throw new Error("Usuario o constasenia incorrecta");

      return usuario;
    } catch (error) {
      throw new Error(error);
    }
  };


  getAllUsuariosService = async () => {
    const usuarios = await this.usuarioDaos.getAllData();
    return usuarios;
  };

  getUsuarioByIdServices = async (id) => {
    const usuarioById = await this.usuarioDaos.getById(id);
    return usuarioById;
  };

  delteUsuarioByIdService = async (id) => {
    const prodcutoEliminado = await this.usuarioDaos.deleteById(id)
    return prodcutoEliminado;
  };

  updateUsuarioByIdService = async (id, usuario) => {
    const idUsuarioActualizado = await this.usuarioDaos.upDate(id, usuario);
    return idUsuarioActualizado;
  };

  getUsuariosByCategoria = async (categoria) => {
    const usuariosCategoria = await this.usuarioDaos.getUsuariosByCategoria(categoria)
    return usuariosCategoria;
  }


  getImagenUsuariosById = async (id) => {
    const usuario = await this.usuarioDaos.getById(id);
    const imagenById = usuario.fotoUrlUsuario;
    return imagenById;
  }
};

module.exports = UsuariosServices;

