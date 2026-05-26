const { sql } = require('../config/db');

const obtenerReparaciones = async (req, res) => {
    try {
        const result = await sql.query`
            SELECT
                Reparaciones.idReparacion,
                Reparaciones.fechaIngreso,
                Reparaciones.observaciones,
                Reparaciones.costoManoObra,

                ISNULL(
                    SUM(
                        DetalleRepuesto.cantidad *
                        DetalleRepuesto.precioUnitario
                    ),
                    0
                ) AS totalRepuestos,

                (
                    Reparaciones.costoManoObra +
                    ISNULL(
                        SUM(
                            DetalleRepuesto.cantidad *
                            DetalleRepuesto.precioUnitario
                        ),
                        0
                    )
                ) AS totalGeneral,

                Reparaciones.idEquipo,
                Reparaciones.idTecnico,
                Reparaciones.idEstado,

                Equipos.marca,
                Equipos.modelo,

                Tecnicos.nombres AS tecnico,

                EstadoReparaciones.nombreEstado

            FROM Reparaciones

            INNER JOIN Equipos
                ON Reparaciones.idEquipo = Equipos.idEquipo

            LEFT JOIN Tecnicos
                ON Reparaciones.idTecnico = Tecnicos.idTecnico

            INNER JOIN EstadoReparaciones
                ON Reparaciones.idEstado = EstadoReparaciones.idEstado

            LEFT JOIN DetalleRepuesto
                ON Reparaciones.idReparacion = DetalleRepuesto.idReparacion

            GROUP BY
                Reparaciones.idReparacion,
                Reparaciones.fechaIngreso,
                Reparaciones.observaciones,
                Reparaciones.costoManoObra,
                Reparaciones.idEquipo,
                Reparaciones.idTecnico,
                Reparaciones.idEstado,
                Equipos.marca,
                Equipos.modelo,
                Tecnicos.nombres,
                EstadoReparaciones.nombreEstado

            ORDER BY Reparaciones.idReparacion DESC
        `;

        res.json(result.recordset);

    } catch (error) {
        console.error('[obtenerReparaciones]', error.message);
        res.status(500).json({ mensaje: 'ERROR NO SE PUDO OBTENER REPARACIONES' });
    }
};

const consultarReparacion = async (req, res) => {
    try {
        const { imei } = req.params;

        if (!imei || imei.trim().length < 5) {
            return res.status(400).json({ mensaje: 'IMEI INVALIDO' });
        }

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
            INNER JOIN Equipos e
                ON r.idEquipo = e.idEquipo
            INNER JOIN EstadoReparaciones er
                ON r.idEstado = er.idEstado
            LEFT JOIN Tecnicos t
                ON r.idTecnico = t.idTecnico
            WHERE e.imei = ${imei.trim()}
        `;

        res.json(result.recordset);

    } catch (error) {
        console.error('[consultarReparacion]', error.message);
        res.status(500).json({ mensaje: 'ERROR AL CONSULTAR' });
    }
};

const validarReparacion = ({ fechaIngreso, observaciones, costoManoObra, idEquipo, idEstado }) => {
    if (!fechaIngreso || !observaciones || costoManoObra === undefined || costoManoObra === '' || !idEquipo || !idEstado) {
        return 'TODOS LOS CAMPOS SON OBLIGATORIOS';
    }
    if (isNaN(costoManoObra) || Number(costoManoObra) < 0) {
        return 'EL COSTO DE MANO DE OBRA NO PUEDE SER NEGATIVO';
    }
    if (isNaN(idEquipo) || Number(idEquipo) <= 0) {
        return 'ID DE EQUIPO INVALIDO';
    }
    if (![1, 2, 3, 4, 5].includes(Number(idEstado))) {
        return 'ESTADO INVALIDO';
    }
    return null;
};

const crearReparaciones = async (req, res) => {
    try {
        const {
            fechaIngreso, observaciones, costoManoObra,
            idEquipo, idTecnico, idEstado
        } = req.body;

        const error = validarReparacion({ fechaIngreso, observaciones, costoManoObra, idEquipo, idEstado });
        if (error) return res.status(400).json({ mensaje: error });

        // idTecnico puede llegar vacío ("") — lo convertimos a null
        const tecnico = idTecnico && !isNaN(idTecnico) ? Number(idTecnico) : null;

        await sql.query`
            INSERT INTO Reparaciones
                (fechaIngreso, observaciones, costoManoObra, idEquipo, idTecnico, idEstado)
            VALUES
                (${fechaIngreso}, ${observaciones.trim()}, ${Number(costoManoObra)},
                 ${Number(idEquipo)}, ${tecnico}, ${Number(idEstado)})
        `;

        res.status(201).json({ mensaje: 'REPARACION REGISTRADA' });

    } catch (error) {
        console.error('[crearReparaciones]', error.message);
        res.status(500).json({ mensaje: 'ERROR NO SE PUDO REGISTRAR' });
    }
};

const actualizarReparacion = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ mensaje: 'ID INVALIDO' });
        }

        const {
            fechaIngreso, observaciones, costoManoObra,
            idEquipo, idTecnico, idEstado
        } = req.body;

        const error = validarReparacion({ fechaIngreso, observaciones, costoManoObra, idEquipo, idEstado });
        if (error) return res.status(400).json({ mensaje: error });

        const tecnico = idTecnico && !isNaN(idTecnico) ? Number(idTecnico) : null;

        await sql.query`
            UPDATE Reparaciones
            SET
                fechaIngreso   = ${fechaIngreso},
                observaciones  = ${observaciones.trim()},
                costoManoObra  = ${Number(costoManoObra)},
                idEquipo       = ${Number(idEquipo)},
                idTecnico      = ${tecnico},
                idEstado       = ${Number(idEstado)}
            WHERE idReparacion = ${Number(id)}
        `;

        res.json({ mensaje: 'REPARACION ACTUALIZADA' });

    } catch (error) {
        console.error('[actualizarReparacion]', error.message);
        res.status(500).json({ mensaje: 'ERROR NO SE PUDO ACTUALIZAR' });
    }
};

const eliminarReparacion = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ mensaje: 'ID INVALIDO' });
        }

        await sql.query`
            DELETE FROM Reparaciones
            WHERE idReparacion = ${Number(id)}
        `;

        res.json({ mensaje: 'REPARACION ELIMINADA' });

    } catch (error) {
        console.error('[eliminarReparacion]', error.message);
        res.status(500).json({ mensaje: 'ERROR NO SE PUDO ELIMINAR' });
    }
};

module.exports = {
    obtenerReparaciones,
    consultarReparacion,
    crearReparaciones,
    actualizarReparacion,
    eliminarReparacion
};
