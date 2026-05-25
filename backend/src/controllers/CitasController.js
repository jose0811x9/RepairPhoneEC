const {sql}= require("../config/db");

const obtenerCitas = async(req, res)=>{
    try{
        const result = await sql.query`
            SELECT * FROM Citas
            ORDER BY idCita DESC    
        `;
        res.json(result.recordset);
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje:'NO SE PUDO OBTENER CITAS'
        });
    }
};
const crearCitas = async(req, res)=>{
    try{
        const{
            nombreCliente, telefono, marca, modelo, problema, fecha, hora
        }= req.body;
        await sql.query`
            INSERT INTO Citas(
                nombreCliente, telefono, marca, modelo, problema, fecha, hora
            )
            VALUES(
                ${nombreCliente},${telefono},${marca},${modelo},${problema},${fecha},${hora}
            )    
        `;
        res.json({
            mensaje: 'CITA REGISTRADA'
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje: 'NO SE PUDO REGISTRAR'
        });
    }
};
module.exports={obtenerCitas,crearCitas};