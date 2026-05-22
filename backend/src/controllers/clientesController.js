
const {sql} = require('../config/db');

const obtenerClientes = async(req, res) => {
    try{
         const result = await sql.query`
            SELECT * FROM Clientes
        `;
        res.json(result.recordset);
    }catch(error){
        console.log(error);         
        res.status(500).json({
            mensaje: 'ERROR NO SE PUDO OBTENER CLIENTES!!'
        })
    }
};
const CrearCliente = async(req,res)=>{
    try{
        const{
            nombres,apellidos,telefono, direccion, correo
        }= req.body;
        await sql.query`
        INSERT INTO Clientes
        (nombres, apellidos, telefono, direccion, correo)

        VALUES
        (${nombres},${apellidos},${telefono}, ${direccion}, ${correo})
        `;
        res.json({
            mensaje:"CLIENTE REGISTRADO"
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje:"ERROR CLIENTE NO REGISTRADO!!"
        });
    }
};
const actualizarCliente = async(req, res) =>{
    try{
        const {id} = req.params;
        const {
            nombres, apellidos,     telefono, direccion, correo
        } = req.body;
        await sql.query`
            UPDATE Clientes
            SET 
                nombres = ${nombres},
                apellidos = ${apellidos},
                telefono = ${telefono},
                direccion = ${direccion},
                correo = ${correo} 
            WHERE idCliente = ${id}
            `;
            res.json({
                mensaje:'CLIENTE ACTUALIZADO'
            });
    }catch(error){
        console.log(error)
        res.status(500).json({
            mensaje:'ERROR NO SE PUDO ACTUALIZAR'
        });
    }
};
const eliminarCliente = async(req, res)=>{
    try{
        const{id} = req.params;
        await sql.query`
            DELETE FROM Clientes
            WHERE idCliente = ${id}
        `;
        res.json({
            mensaje: 'CLIENTE ELIMINADO'
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje: 'ERROR NO SE PUDO BORRAR EL CLIENTE'
        });
    }
};
module.exports = {
    obtenerClientes, CrearCliente, actualizarCliente, eliminarCliente
};