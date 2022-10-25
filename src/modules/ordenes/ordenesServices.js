const OrdenesDaos = require("./ordenesDaos")
const OrdenesSchema = require('./ordenesModel');

class OrdenesServices {
  constructor() {
    this.ordenesDaos = new OrdenesDaos(OrdenesSchema);
  }

  guardarOrdenService = async (orden) => {
    const newOrden = new OrdenesSchema(orden);
    const resultado = await this.ordenesDaos.save(newOrden);
    return resultado;
  };

  getAllOrdenesService = async () => {
    const ordenes = await this.ordeneDaos.getAllData();
    return ordenes;
  };

  getOrdenByIdServices = async (id) => {
    const ordenById = await this.ordenesDaos.getById(id);
    return ordenById;
  };

  delteOrdeneByIdService = async (id) => {
    const ordenEliminado = await this.ordeneDaos.deleteById(id)
    return ordenEliminado;
  };

};

module.exports = OrdenesServices;

