const express = require('express');
const router = express.Router();

const{obtenerRepuesto, crearRepuesto, actualizarRepuesto, eliminarRepuesto}= require('../controllers/RepuestosController');

router.get('/', obtenerRepuesto);
router.post('/', crearRepuesto);
router.put('/:id', actualizarRepuesto);
router.delete('/:id', eliminarRepuesto);

module.exports = router;

