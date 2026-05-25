const {sql}= require('../config/db');
const obtenerReparaciones = async(req, res)=>{
    try{
        const result = await sql.query`
            SELECT
                Reparaciones.idReparacion,
                Reparaciones.fechaIngreso,
                Reparaciones.observaciones,
                Reparaciones.costoManoObra,
                Reparaciones.idEquipo,
                Reparaciones.idTecnico,
                Reparaciones.idEstado,
                Equipos.marca,
                Equipos.modelo,
                Tecnicos.nombres AS tecnico,
                EstadoReparaciones.nombreEstado
            FROM Reparaciones
            INNER JOIN Equipos on Reparaciones.idEquipo = Equipos.idEquipo
            INNER JOIN Tecnicos on Reparaciones.idTecnico = Tecnicos.idTecnico
            INNER JOIN EstadoReparaciones on Reparaciones.idEstado = EstadoReparaciones.idEstado    
        `;
        res.json(result.recordset);
        
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje:'ERROR NO SE PUDO OBTENER REPARACIONES'
        });
    }
};
const obtenerMisReparaciones = async(req, res)=>{
    try{
        const {idUsuario} = req.params;
        const result = await sql.query`
            SELECT
                r.idReparacion,
                r.fechaIngreso,
                    r.observaciones,
                r.costoManoObra,
                e.marca,
                e.modelo,
                e.imei,
                er.nombreEstado, 
                t.nombres AS tecnico
            FROM Reparaciones r
            INNER JOIN Equipos e ON r.idEquipo = e.idEquipo
            INNER JOIN Clientes c ON e.idCliente = c.idCliente
            INNER JOIN EstadoReparaciones er ON r.idEstado = er.idEstado
            INNER JOIN Tecnicos t ON r.idTecnico = t.idTecnico
            WHERE c.idUsuario = ${idUsuario}
        `;
        res.json(result.recordset);
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje: 'NO SE PUDO OBTENER REPARACIONES'
        });
    }
};
const crearReparaciones = async(req, res)=>{
        try{
            const{
                fechaIngreso,observaciones, costoManoObra, idEquipo, idTecnico, idEstado
            }=req.body;
            await sql.query`
                INSERT INTO Reparaciones
                (
                    fechaIngreso, observaciones, costoManoObra, idEquipo, idTecnico, idEstado
                )
                VALUES
                (
                    ${fechaIngreso},${observaciones},${costoManoObra},${idEquipo},${idTecnico},${idEstado}
                )
            `;
            res.json({
                mensaje: 'REPARACION REGISTRADA'
            });
        }catch(error){
            console.log(error);
            res.status(500).json({
                mensaje: 'ERROR NO SE PUDO REGISTRAR'
            });
        }
};
const actualizarReparacion = async(req, res)=>{
    try{
        const {id}= req.params;
        console.log(req.body);
        const{
            fechaIngreso, observaciones, costoManoObra, idEquipo, idTecnico, idEstado
        }= req.body;
        await sql.query`
            UPDATE Reparaciones
            SET
                fechaIngreso=${fechaIngreso},
                observaciones=${observaciones},
                costoManoObra=${costoManoObra},
                idEquipo=${idEquipo},
                idTecnico=${idTecnico},
                idEstado=${idEstado}
            WHERE idReparacion=${id}
        `;
        res.json({
            mensaje:'REPARACION ACTUALIZADA'
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
           mensaje:'ERROR NO SE PUDO ACTUALIZAR'
        });
    }
};
const eliminarReparacion = async(req, res)=>{
    try{
        const {id}= req.params;
        await sql.query`
            DELETE FROM Reparaciones
            WHERE idReparacion=${id}
        `;
        res.json({
            mensaje:'REPARACION ELIMINADA'
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje:'ERROR NO SE PUDO ELIMINAR'
        })
    }
    
}

module.exports= {obtenerReparaciones, obtenerMisReparaciones, crearReparaciones, actualizarReparacion, eliminarReparacion};  