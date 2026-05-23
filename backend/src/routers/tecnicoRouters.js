const express = require('express');
const router =express.Router();

const {
    obtenerTecnicos, crearTecnico, actualizarTecnico, eliminarTecnico
}= require('../controllers/TecnicosController');
router.get('/', obtenerTecnicos)
router.post('/', crearTecnico)
router.put('/:id', actualizarTecnico)
router.delete('/:id', eliminarTecnico)
module.exports= router;