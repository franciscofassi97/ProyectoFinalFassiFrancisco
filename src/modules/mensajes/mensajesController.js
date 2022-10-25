const MensajesServices = require('./mensajesServices');

class MensajesController {

  constructor() {
    this.MensajesServices = new MensajesServices();
  }

  guardarMensajesController = async (req, res) => {
    try {
      const { emailUsuario, tipoUsuario, cuerpoMensaje } = req.body;

      const id = await this.MensajesServices.guardarMensajesService(
        {
          emailUsuario,
          tipoUsuario,
          cuerpoMensaje
        });

      return res.status(200).json({ idMensajes: id });

    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };
  };

  getMensajesController = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        const mensaje = await this.MensajesServices.getMensajesByIdServices(id);
        if (mensaje) return res.status(200).json(mensaje);
        else return res.status(404).json({ message: "No se encontro el mensaje" });

      } else {
        const mensajes = await this.MensajesServices.getAllMensajesService();
        if (mensajes) return res.status(200).json(mensajes);

        else return res.status(404).json({ message: "No se encontraron mensajes" });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    };
  };

  borrarMensajesController = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        const mensajeEliminado = await this.MensajesServices.delteMensajesByIdService(id);
        if (mensajeEliminado) return res.status(200).json(mensajeEliminado);
        else return res.status(404).json({ message: "No se encontro el mensaje" });
      };
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };
}
module.exports = MensajesController;