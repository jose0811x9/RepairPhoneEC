const express = require('express');
const router = express.Router();

const{
    obtenerCitas, crearCitas
} = require('../controllers/CitasController');

router.get('/',obtenerCitas)
router.post('/',crearCitas)

module.exports = router;