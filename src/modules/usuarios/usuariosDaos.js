const DaosMongoBase = require('../daos/daosMongoBase');


class UsuariosDaos extends DaosMongoBase {
  constructor(schema) {
    super(schema);
  };

  existeUsuario = async (email) => {
    const usuario = await this.schema.findOne({ email })
    if (usuario) return true;
    return false;
  };

  findByEmail = async (email) => {
    const usuario = await this.schema.findOne({ email })
    if (usuario) return usuario;
    return false;

  };
}
module.exports = UsuariosDaos;