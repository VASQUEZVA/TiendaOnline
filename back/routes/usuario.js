var express = require('express');
var usuarioController = require('../controllers/usuarioController');
var authenticate = require('../middlewares/authenticate')

var api = express.Router();

api.post('/registro_usuario_admin', authenticate.decodeToken,usuarioController.registro_usuario_admin)
api.post('/login_usuario',usuarioController.login_usuario);

module.exports = api; 