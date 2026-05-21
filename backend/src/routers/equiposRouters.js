const express = require('express');
const router = express.Router();

const{
    obtenerEquipos, crearEquipo
}= require('../controllers/EquiposController');
router.get('/', obtenerEquipos);
router.post('/',crearEquipo);

module.exports= router;