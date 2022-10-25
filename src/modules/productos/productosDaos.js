const DaosMongoBase = require('../daos/daosMongoBase');

class ProductosDaos extends DaosMongoBase {
  constructor(schema) {
    super(schema);
  };

  getProductosByCategoria = async (categoria) => {
    try {
      const productosCategoria = await this.schema.find({ categoria: `${categoria}` });
      if (productosCategoria) return productosCategoria;
      else throw new Error("No encontrado");
    } catch (error) {
      console.log("Error Al buscar ");
    }
  };
};

module.exports = ProductosDaos;