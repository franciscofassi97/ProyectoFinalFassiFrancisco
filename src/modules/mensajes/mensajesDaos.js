const DaosMongoBase = require('../daos/daosMongoBase');

class MensajesDaos extends DaosMongoBase {
  constructor(schema) {
    super(schema);
  };

};

module.exports = MensajesDaos;