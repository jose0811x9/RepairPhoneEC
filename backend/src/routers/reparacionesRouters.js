const express = require('express');
const router = express.Router();

const {
    obtenerReparaciones,
    crearReparaciones,
    actualizarReparacion,
    eliminarReparacion,
    consultarReparacion
} = require('../controllers/ReparacionesController');

router.get('/', obtenerReparaciones);
router.get('/consultar/:imei', consultarReparacion);
router.post('/', crearReparaciones);
router.put('/:id', actualizarReparacion);
router.delete('/:id', eliminarReparacion);
module.exports = router;