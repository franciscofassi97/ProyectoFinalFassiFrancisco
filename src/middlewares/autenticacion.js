
const { TOKEN_SECRETO } = require('../../config/configIndex');
const UsuariosServices = require('../modules/usuarios/usuariosServices');
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const opciones = {};

opciones.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opciones.secretOrKey = TOKEN_SECRETO;


module.exports = (passport) => {
  passport.use(new JWTStrategy(opciones, async (token, done) => {
    try {
      const usuarioServicios = new UsuariosServices();
      const usuario = await usuarioServicios.getUsuarioByIdServices(token.id)
      const { email, _id } = usuario
      if (usuario) return done(null, { email, _id });
      return done(null, false, { menssage: "debe logearse" });
    } catch (error) {
      done(error)
    }
  }))
};
