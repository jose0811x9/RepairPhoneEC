const express = require('express');
const router = express.Router();
const{
    obtenerFactura, generarFactura    
} = require('../controllers/FacturasController');

router.get('/:idReparacion',obtenerFactura);
router.post('/',generarFactura);

module.exports = router;