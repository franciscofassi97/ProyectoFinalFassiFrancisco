const express = require('express');
const { PORT, MODO } = require('./config/configIndex');
const cookieParser = require('cookie-parser');
const app = express();

const connectDB = require('./config/dataBaseConfig');
connectDB();

//Inicio servidor le paso app para sockets
const { Server: HttpServer } = require('http');
const httpServer = new HttpServer(app);


//Middleware
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(passport.initialize());
// require('./src/middlewares/autenticacion')(passport);


//Incio sockets
const io = require('./src/modules/sockets/socket');
io(httpServer);



/*-----------------Inicio Configuracion de handlebars------------------*/
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')


app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");
/*-----------------FIN Configuracion de handlebars------------------*/



const routerProductos = require('./src/modules/productos/productosRouters');
const routerCarritos = require('./src/modules/carritos/carritosRouters');
const routerOrdenes = require('./src/modules/ordenes/ordenesRouters');
const routerMensajes = require('./src/modules/mensajes/mensajesRouter');
const routerUsuarios = require('./src/modules/usuarios/usuariosRouter');


app.use("/api/productos", routerProductos);
app.use("/api/carritos", routerCarritos);
app.use("/api/ordenes", routerOrdenes)
app.use("/api/mensajes", routerMensajes)
app.use("/api/usuarios", routerUsuarios);


app.get("/", (_, res) => {
  res.redirect("/api/usuarios/iniciarSesion");
});


app.use(function (err, req, res, next) {
  if (401 == err.status) {
    res.redirect('/api/usuarios/iniciarSesion')
  }
});

if (MODO === "FORK") {

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

} else {
  console.log(`Procesos: ${processID}, - isMaster: ${cluster.isMaster}, - numeroCpu: ${numeroCpu}`);
  if (cluster.isPrimary) {
    for (let i = 0; i < numeroCpu; i++) {
      cluster.fork()
    }
    cluster.on('exit', (worker) => {
      console.log(`Proceso ${worker.process.pid} terminado`);
    })
  } else {
    httpServer.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
  }
}