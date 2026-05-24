const express = require('express');
const router = express.Router();

const{
    obtenerEquipos, crearEquipo, actualizarEquipo, eliminarEquipo
}= require('../controllers/EquiposController');
router.get('/', obtenerEquipos);
router.post('/',crearEquipo);
router.put('/:id', actualizarEquipo);
router.delete('/:id',eliminarEquipo);


module.exports= router;