const {sql} = require('../config/db');

const obtenerDetalle = async(req, res)=>{
    try{
        const {idReparacion} = req.params;
        const result = await sql.query`
            SELECT 
                dr.idDetalle, dr.cantidad, dr.precioUnitario, r.nombre
            FROM DetalleRepuesto dr
            INNER JOIN Repuestos r ON dr.idRepuesto = r.idRepuesto
            WHERE dr.idReparacion = ${idReparacion}    
        `;
        res.json(result.recordset);
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje: 'NO SE PUDO OBTENER DETALLE'
        });
    }
};
const agregarDetalle = async(req, res)=>{
    try{
        const{idReparacion, idRepuesto, cantidad}= req.body;
        const repuesto = await sql.query`
            SELECT * FROM Repuestos
            WHERE idRepuesto =${idRepuesto}
        `;  
        if(repuesto.recordset.length === 0){
            return res.status(404).json({
                mensaje: 'NO SE ENCONTRO ESTE REPUESTO'
            });
        }
        const datos = repuesto.recordset[0];
        if(datos.Stock < cantidad){
            return res.status(400).json({
                mensaje: 'STOCK INSUFICIENTE'
            });
        }
        await sql.query`
            INSERT INTO DetalleRepuesto(
                idReparacion, idRepuesto, cantidad, precioUnitario
            )
            VALUES(
                ${idReparacion},${idRepuesto},${cantidad},${datos.precio}
            )
        `;
        await sql.query`
            UPDATE Repuestos
            SET Stock = Stock-${cantidad} 
            WHERE idRepuesto = ${idRepuesto}
        `;
        await sql.query`
            UPDATE Reparaciones
            SET idEstado = 3
            WHERE idReparacion = ${idReparacion}
        `;
        res.json({
            mensaje: 'REPUESTO AGREGADO'
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje: 'NO SE PUDO AGREGAR'
        });
    }
};
module.exports = {
    obtenerDetalle, agregarDetalle
};