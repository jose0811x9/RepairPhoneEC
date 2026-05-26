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
const crearCitas = async (req, res) => {
    try {
         console.log(req.body);
        const { nombreCliente, telefono, marca, modelo, problema, fecha, hora } = req.body;

        if (!nombreCliente || !telefono || !marca || !modelo || !problema || !fecha || !hora) {
            return res.status(400).json({ mensaje: 'TODOS LOS CAMPOS SON OBLIGATORIOS' });
        }
        if (nombreCliente.trim().length < 5) {
            return res.status(400).json({ mensaje: 'EL NOMBRE DEBE TENER AL MENOS 5 CARACTERES' });
        }
        if (!/^\d{10}$/.test(telefono)) {
            return res.status(400).json({ mensaje: 'TELEFONO INVÁLIDO (debe tener 10 digitos)' });
        }
        const fechaCita = new Date(fecha);
        const hoy = new Date();
        hoy.setHours(0,0,0,0);

        if (isNaN(fechaCita.getTime()) || fechaCita < hoy) {
            return res.status(400).json({
                mensaje:'LA FECHA NO PUEDE SER DE DÍAS ANTERIORES'
            });
        }
        const existeCita = await sql.query`
            SELECT * FROM Citas
            WHERE fecha = ${fecha} AND hora = ${hora}
        `;
        if(existeCita.recordset.length>0){
            return res.status(400).json({
                mensaje:'YA EXISTE UNA CITA A ESA HORA'
            });
        }
        await sql.query`
            INSERT INTO Citas(nombreCliente, telefono, marca, modelo, problema, fecha, hora)
            VALUES(${nombreCliente.trim()}, ${telefono}, ${marca.trim()}, ${modelo.trim()}, ${problema.trim()}, ${fecha}, ${hora})
        `;
        res.json({ mensaje: 'CITA REGISTRADA' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'NO SE PUDO REGISTRAR' });
    }
};
const eliminarCita = async(req, res)=>{
    try{
        const {id} = req.params;
        await sql.query`
            DELETE FROM Citas
            WHERE idCita = ${id}
        `;
        res.json({
            mensaje:'CITA ELIMINADA'
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje:'NO SE PUDO ELIMINAR'
        });
    }
};
const atenderCita = async(req, res)=>{
    try{
        const {id} = req.params;

        const cita = await sql.query`
            SELECT * FROM Citas
            WHERE idCita = ${id}
        `;

        if(cita.recordset.length === 0){
            return res.status(404).json({
                mensaje:'CITA NO ENCONTRADA'
            });
        }

        const datos = cita.recordset[0];

        const cliente = await sql.query`
            INSERT INTO Clientes(
                nombres, apellidos, telefono
            )
            OUTPUT INSERTED.idCliente
            VALUES(
                ${datos.nombreCliente},
                'NO REGISTRADO',
                ${datos.telefono}
            )
        `;

        const idCliente = cliente.recordset[0].idCliente;

        const equipo = await sql.query`
            INSERT INTO Equipos(
                marca, modelo, imei, problema, idCliente
            )
            OUTPUT INSERTED.idEquipo
            VALUES(
                ${datos.marca},
                ${datos.modelo},
                'PENDIENTE',
                ${datos.problema},
                ${idCliente}
            )
        `;

        const idEquipo = equipo.recordset[0].idEquipo;

        await sql.query`
            INSERT INTO Reparaciones(
                fechaIngreso,
                observaciones,
                costoManoObra,
                idEquipo,
                idEstado
            )
            VALUES(
                GETDATE(),
                ${datos.problema},
                0,
                ${idEquipo},
                1
            )
        `;

        await sql.query`
            UPDATE Citas
            SET estado = 'Atendida'
            WHERE idCita = ${id}
        `;

        res.json({
            mensaje:'CITA ATENDIDA'
        });

    }catch(error){
        console.log(error);

        res.status(500).json({
            mensaje:'ERROR DEL SISTEMA'
        });
    }
};
module.exports={obtenerCitas,crearCitas,eliminarCita, atenderCita};