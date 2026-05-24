const express = require('express');
const router = express.Router();

const {
    obtenerReparaciones,
    crearReparaciones,
    actualizarReparacion,
    eliminarReparacion
} = require('../controllers/ReparacionesController');

router.get('/', obtenerReparaciones);
router.post('/', crearReparaciones);
router.put('/:id', actualizarReparacion);
router.delete('/:id', eliminarReparacion);
module.exports = router;