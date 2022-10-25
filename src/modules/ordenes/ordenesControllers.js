const OrdenesServices = require('./ordenesServices');

// const OrdeneServices = new OrdenesServices();

class OrdenesController {

  constructor() {
    this.OrdenesServices = new OrdenesServices();
  }

  guardarOrdenController = async (req, res) => {
    try {
      const newOrden = {
        ordens: [{ ordenNombre: "Algun Ordene", cantidad: 3 }, { ordenNombre: "Otro Ordene", cantidad: 2 }],
        emailUsuario: 'emailUsuario'
      };

      const id = await this.OrdenesServices.guardarOrdenService(newOrden);
      const orden = await this.OrdenesServices.getOrdenByIdServices(id);
      const numeroOrde = orden.numeroOrden;

      return res.status(200).json({ numeroOrde: numeroOrde });

    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };
  };

  getOrdenesController = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        const orden = await this.OrdeneServices.getOrdeneByIdServices(id);
        if (orden) return res.status(200).json(orden);
        else return res.status(404).json({ message: "No se encontro el orden" });

      } else {
        const ordens = await this.OrdeneServices.getAllOrdenesService();
        if (ordens) return res.status(200).json(ordens);

        else return res.status(404).json({ message: "No se encontraron ordens" });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };
  };

  borrarOrdeneController = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        const ordenEliminado = await this.OrdeneServices.delteOrdeneByIdService(id);
        if (ordenEliminado) return res.status(200).json(ordenEliminado);
        else return res.status(404).json({ message: "No se encontro el orden" });
      };
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };

}
module.exports = OrdenesController;