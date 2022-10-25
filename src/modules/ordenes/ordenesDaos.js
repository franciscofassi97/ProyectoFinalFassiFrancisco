const DaosMongoBase = require('../daos/daosMongoBase');

class OrdenesDaos extends DaosMongoBase {
  constructor(schema) {
    super(schema);
  };
};

module.exports = OrdenesDaos;