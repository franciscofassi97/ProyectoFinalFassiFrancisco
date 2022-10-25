const MensajesDaos = require("./mensajesDaos")
const MensajesSchema = require('../mensajes/mensajesModel');

class MensajesServices {
  constructor() {
    this.mensajesDaos = new MensajesDaos(MensajesSchema);
  }

  guardarMensajesService = async (mensaje) => {
    const newMensaje = new MensajesSchema(mensaje);
    const resultado = await this.mensajesDaos.save(newMensaje);
    return resultado
  };

  getAllMensajesService = async () => {
    const mensajes = await this.mensajesDaos.getAllData();
    return mensajes;
  };

  getMensajesByIdServices = async (id) => {
    const mensajeById = await this.mensajesDaos.getById(id);
    return mensajeById;
  };

  delteMensajesByIdService = async (id) => {
    const mensajeEliminado = await this.mensajesDaos.deleteById(id)
    return mensajeEliminado;
  };
};

module.exports = MensajesServices;