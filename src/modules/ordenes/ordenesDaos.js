const DaosMongoBase = require('../daos/daosMongoBase');

class OrdenesDaos extends DaosMongoBase {
  constructor(schema) {
    super(schema);
  };

  getProductosByCategoria = async (categoria) => {
    try {
      const productosCategoria = await this.schema.find({ nombre: `${categoria}` });
      if (productosCategoria) return productosCategoria;
      else throw new Error("No encontrado");
    } catch (error) {
      console.log("Error Al buscar ");
    }
  };
};

module.exports = OrdenesDaos;