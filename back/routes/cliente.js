var express = require('express');
var clienteController = require('../controllers/clienteController');

var api = express.Router();

api.get('/testing',clienteController.testing)

module.exports = api;