const express = require('express');

const router = express.Router();

const { obtenerDetalle, agregarDetalle}= require('../controllers/DetalleRepuestoController');

router.get('/:idReparacion', obtenerDetalle);
router.post('/', agregarDetalle);

module.exports = router;