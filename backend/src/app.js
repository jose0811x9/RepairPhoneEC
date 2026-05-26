const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./config/db')
const LoginRouter = require('./routers/LoginRoutes');
const ClienteRouters = require('./routers/clientesRouters');
const CitasRouters = require('./routers/CitasRouter')
const TecnicoRouters = require('./routers/tecnicoRouters');
const EquipoRouters = require('./routers/equiposRouters');
const ReparacionesRouters = require('./routers/reparacionesRouters');
const RepuestoRouters = require('./routers/RepuestosRoutes');
const DetalleRepuesto = require('./routers/DetalleRepuestoRoutes');
const FacturasRouters = require('./routers/FacturasRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/login',LoginRouter);
app.use('/api/clientes', ClienteRouters);
app.use('/api/citas', CitasRouters);
app.use('/api/tecnicos', TecnicoRouters);
app.use('/api/equipos', EquipoRouters);
app.use('/api/reparaciones', ReparacionesRouters);
app.use('/api/detalle-repuesto', DetalleRepuesto);
app.use('/api/repuestos', RepuestoRouters);
app.use('/api/facturas',FacturasRouters);


const PORT = process.env.PORT || 3000;
connectDB();

app.get('/', (req, res)=>{
    res.send('Servidor Repair Phone EC Funciona correctamente')
});

app.listen(PORT, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
})