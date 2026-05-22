const {sql} = require('../config/db');
const obtenerEquipos= async(req, res)=>{
    try{
        const result = await sql.query`
            SELECT 
                Equipos.idEquipo,
                Equipos.marca,
                Equipos.modelo,
                Equipos.imei,
                Equipos.problema, 
                Clientes.nombres
            
             FROM Equipos
            INNER JOIN Clientes
            ON Equipos.idCliente = Clientes.idCliente
        `;
        res.json(result.recordset);
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje:'NO SE PUDO OBTENER LOS EQUIPOS'
        });
    }
};
const crearEquipo = async(req, res)=>{
    try{
        const{
            marca, modelo, imei, problema, idCliente
        }=req.body;
        await sql.query`
            INSERT INTO Equipos
            (marca, modelo, imei, problema, idCliente)
            VALUES
            (
                ${marca},
                ${modelo},
                ${imei},
                ${problema},
                ${idCliente}
            )
        `;
        res.json({
            mensaje:'EQUIPO REGISTRADO'
        });
    }catch(error){
        console.log(error)
        res.status(500).json({
            mensaje:'NO SE PUDO REGISTRAR ESTE USUARIO'
        });
    }
};
module.exports={
    obtenerEquipos, crearEquipo
};