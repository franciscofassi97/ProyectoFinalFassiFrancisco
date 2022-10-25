const ProductosServices = require('../productos/productosServices');
const MensajesServices = require('../mensajes/mensajesServices');


module.exports = (server) => {
	const { Server: IoServer } = require("socket.io");
	const ioSocket = new IoServer(server);

	ioSocket.on("connection", async (socket) => {
		console.log("New cliente connected");
		const productosServices = new ProductosServices();
		const mensajesServices = new MensajesServices();
		//Emitit eventos de sockets para visualizacion de datos en el cliente
		const listProductos = await productosServices.getAllProductosService();
		const listMensajes = await mensajesServices.getAllMensajesService();
		socket.emit("leerProductos", listProductos);
		socket.emit("leerMensajes", listMensajes);

		//Prodcutos 
		socket.on("agregarProducto", async (producto) => {
			const idProducto = await productosServices.guardarProductoService(producto);
			const listProductos = await productosServices.getAllProductosService();
			if (idProducto) ioSocket.sockets.emit("leerProductos", listProductos);
		})

		//Chat
		socket.on("agregarMensaje", async (mensaje) => {
			const idMensaje = await mensajesServices.guardarMensajesService(mensaje);
			const listMensajes = await mensajesServices.getAllMensajesService();
			if (idMensaje) ioSocket.sockets.emit("leerMensajes", listMensajes);
		})
	})
};