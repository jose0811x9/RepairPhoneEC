const express = require('express');
const router = express.Router();

const{
    obtenerCitas, crearCitas, eliminarCita, atenderCita
} = require('../controllers/CitasController');

router.get('/',obtenerCitas);
router.post('/',crearCitas);
router.delete('/',eliminarCita);
router.put('/atender/:id', atenderCita);

module.exports = router;