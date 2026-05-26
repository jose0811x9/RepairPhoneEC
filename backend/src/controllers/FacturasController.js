const {sql}= require('../config/db');
const obtenerFactura = async(req, res)=>{
    try{
        const {idReparacion} = req.params;
        const reparacion = await sql.query`
            SELECT
                r.idReparacion,
                r.costoManoObra,

                c.nombres + ' ' + c.apellidos AS cliente,

                e.marca,
                e.modelo,

                t.nombres AS tecnico

            FROM Reparaciones r

            INNER JOIN Equipos e
                ON r.idEquipo = e.idEquipo

            INNER JOIN Clientes c
                ON e.idCliente = c.idCliente

            LEFT JOIN Tecnicos t
                ON r.idTecnico = t.idTecnico

            WHERE r.idReparacion = ${idReparacion}
        `;
        const repuestos = await sql.query`
            SELECT
                r.nombre,
                dr.cantidad,
                dr.precioUnitario,
                (
                    dr.cantidad *
                    dr.precioUnitario
                ) AS subtotal

            FROM DetalleRepuesto dr

            INNER JOIN Repuestos r
                ON dr.idRepuesto =
                r.idRepuesto

            WHERE dr.idReparacion =
            ${idReparacion}
        `;
        if(reparacion.recordset.length === 0){
            return res.status(404).json({
                mensaje:'REPARACION NO ENCONTRADA'
            });
        }
        const datos = reparacion.recordset[0];
        const totalRepuestos = repuestos.recordset.reduce((acc, item)=> acc + Number(item.subtotal), 0);
        const subtotal = Number(datos.costoManoObra)+ totalRepuestos;
        const iva = subtotal * 0.15;
        const total = subtotal + iva;
        res.json({
            reparacion: datos,
            repuestos: repuestos.recordset,subtotal,iva,total
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje:'NO SE PUEDE OBTENER LA FACTURA'
        });
    }
};
const generarFactura = async(req, res)=>{
    try{
        const{idReparacion, subtotal, iva, total}= req.body;
        const existe = await sql.query`
            SELECT * FROM Facturas
            WHERE idReparacion = ${idReparacion}
        `;
        if(existe.recordset.length>0){
            return res.status(400).json({
                mensaje:'YA CUENTA CON FACTURA'
            });
        }
        await sql.query`
            INSERT INTO Facturas(
                fecha, subtotal, iva, total, idReparacion
            )
            VALUES(
                GETDATE(),
                ${subtotal}, ${iva}, ${total}, ${idReparacion}
            )
        `;
        await sql.query`
            UPDATE Reparaciones
            SET idEstado = 4
            WHERE idReparacion = ${idReparacion}
        `;
        res.json({
            mensaje:'FACTURA GENERADA'
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje:'NO SE PUDO GENERAR LA FACTURA'
        });
    }
};
module.exports ={
    obtenerFactura, generarFactura
};