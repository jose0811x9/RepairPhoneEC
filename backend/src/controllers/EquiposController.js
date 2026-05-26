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
                Equipos.idCliente,
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
const validarEquipo = ({ marca, modelo, imei, problema, idCliente }) => {
    if (!marca || !modelo || !imei || !problema || !idCliente) {
        return 'TODOS LOS CAMPOS SON OBLIGATORIOS';
    }

    if (isNaN(Number(idCliente)) || Number(idCliente) <= 0) {
        return 'ID DE CLIENTE INVÁLIDO';
    }

    const limpio = imei.trim();

    if (limpio !== 'PENDIENTE' && !/^\d{15}$/.test(limpio)) {
        return 'IMEI INVÁLIDO (debe tener 15 dígitos)';
    }

    return null;
};

const crearEquipo = async (req, res) => {
    try {
        const { marca, modelo, imei, problema, idCliente } = req.body;

        const error = validarEquipo({ marca, modelo, imei, problema, idCliente });
        if (error) return res.status(400).json({ mensaje: error });
        const safe = (v) => (typeof v === 'string' ? v.trim() : '');
        await sql.query`
            INSERT INTO Equipos(marca, modelo, imei, problema, idCliente)
            VALUES(${safe(marca)}, ${safe(modelo)}, ${imei}, ${safe(problema)}, ${idCliente})
        `;
        return res.status(201).json({ mensaje: 'EQUIPO REGISTRADO' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'NO SE PUDO REGISTRAR ESTE EQUIPO' });
    }
};

const actualizarEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const { marca, modelo, imei, problema, idCliente } = req.body;

        if (!id || isNaN(id)) return res.status(400).json({ mensaje: 'ID INVÁLIDO' });
        const error = validarEquipo({ marca, modelo, imei, problema, idCliente });
        if (error) return res.status(400).json({ mensaje: error });
        const safe = (v) => (typeof v === 'string' ? v.trim() : '');
        await sql.query`
            UPDATE Equipos
            SET marca=${safe(marca)},
                modelo=${safe(modelo)},
                imei=${imei},
                problema=${safe(problema)},
                idCliente=${idCliente}
            WHERE idEquipo=${id}
        `;
        res.json({ mensaje: 'EQUIPO ACTUALIZADO' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'ERROR NO SE PUDO ACTUALIZAR' });
    }
};
const eliminarEquipo = async(req, res)=>{
    try{
        const {id} = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ mensaje: 'ID INVÁLIDO' });
        }

        await sql.query`
            DELETE FROM Equipos
            WHERE idEquipo = ${id}
        `;
        res.json({
            mensaje:'EQUIPO ELIMINADO'
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje:'ERROR NO SE PUDO ELIMINAR'
        });
    }
};
module.exports={
    obtenerEquipos, crearEquipo, actualizarEquipo, eliminarEquipo
};