const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./config/db')
const LoginRouter = require('./routers/LoginRoutes');
const ClienteRouters = require('./routers/clientesRouters');
const TecnicoRouters = require('./routers/tecnicoRouters');
const EquipoRouters = require('./routers/equiposRouters');
const ReparacionesRouters = require('./routers/reparacionesRouters');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/login',LoginRouter);
app.use('/api/clientes', ClienteRouters);
app.use('/api/tecnicos', TecnicoRouters);
app.use('/api/equipos', EquipoRouters);
app.use('/api/reparaciones', ReparacionesRouters);


const PORT = process.env.PORT || 3000;
connectDB();

app.get('/', (req, res)=>{
    res.send('Servidor Repair Phone EC Funciona correctamente')
});

app.listen(PORT, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
})