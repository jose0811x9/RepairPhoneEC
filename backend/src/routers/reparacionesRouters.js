const express = require('express');
const router = express.Router();

const {
    obtenerReparaciones,
    crearReparaciones,
    actualizarReparacion,
    eliminarReparacion,
    obtenerMisReparaciones
} = require('../controllers/ReparacionesController');

router.get('/', obtenerReparaciones);
router.get('/misreparaciones/:idUsuario', obtenerMisReparaciones)
router.post('/', crearReparaciones);
router.put('/:id', actualizarReparacion);
router.delete('/:id', eliminarReparacion);
module.exports = router;