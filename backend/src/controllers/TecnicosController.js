const { act } = require("react");
const {sql}= require("../config/db");

const obtenerTecnicos= async(req, res)=>{
    try{
        const result = await sql.query`
        SELECT * FROM Tecnicos
        `;
        res.json(result.recordset);
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje:'ERROR NO SE PUDO OBTENER TECNICOS!!'
        });
    }
};
const crearTecnico = async(req, res)=>{
    try{
        const{
            nombres, especialidad, telefono
        }=req.body;
        await sql.query`
            INSERT INTO Tecnicos
            (nombres, especialidad, telefono)
            VALUE
            (${nombres}, ${especialidad},${telefono})   
        `;
        res.json({mensaje: 'TECNICO REGISTRADO'});
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje: 'ERROR TECNICO NO REGISTRADO'
        });
    }
};
const actualizarTecnico= async(req, res)=>{
    try{
        const {id} = req.params;
        const{
            nombres, especialidad, telefono
        }= req.body;
        await sql.query`
            UPDATE Tecnicos
            SET
                nombres = ${nombres},
                especialidad = ${especialidad},
                telefono = ${especialidad}
            WHERE idTecnico = ${id}
        `;
        res.json({ mensaje: 'CLIENTE ACTUALIZADO'});
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje: 'ERROR NO SE PUDO ACTUALIZAR'
        });
    }
};
const eliminarTecnico = async(req, res)=>{
    try{
        const {id}= req.params;
        await sql.query`
            DELETE FROM Tecnicos
            WHERE idTecnico =${id}
        `;
        res.json({mensaje:'CLIENTE ELIMINADO'});
   }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje: 'ERROR NO SE PUDO ELIMINAR'
        });
   }
};
module.exports={
    obtenerTecnicos, crearTecnico, actualizarTecnico, eliminarTecnico
};