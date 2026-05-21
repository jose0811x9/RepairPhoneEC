const express = require('express')
const router = express.Router();

const {
    obtenerClientes,
    CrearCliente,
    actualizarCliente,
    eliminarCliente
} = require('../controllers/ClientesController');
router.get('/', obtenerClientes);
router.post('/', CrearCliente);
router.put('/:id',actualizarCliente);
router.delete('/:id',eliminarCliente);

module.exports = router;