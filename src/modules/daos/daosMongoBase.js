class DaosMongoBase {

  constructor(schema) {
    this.schema = schema;
  }

  save = async (objecto) => {
    try {
      const objectoSaved = await objecto.save();
      return objectoSaved._id;
    } catch (error) {
      throw new Error(error);
    }
  }

  getAllData = async () => {
    try {
      const objetos = await this.schema.find();
      if (objetos) return objetos;
      else throw new Error("No encontrado");
    } catch (error) {
      console.log("Error Al guardar ");
    }
  }

  getById = async (id) => {
    try {
      const objectoById = await this.schema.findById(id);
      if (objectoById) return objectoById;
      else throw new Error("No encontrado");
    } catch (error) {
      console.log("Error Al buscar ");
    }
  }

  deleteById = async (id) => {
    try {
      const objectoById = await this.schema.findByIdAndDelete(id);
      return objectoById;
    } catch (error) {
      console.log("Error al eliminar");
    }
  }

  upDate = async (id, objeto) => {
    try {
      const objectoById = await this.schema.findByIdAndUpdate(id, objeto);
      return objectoById;
    } catch (error) {
      console.log("Error al actualizar");
    }
  }
};


module.exports = DaosMongoBase;