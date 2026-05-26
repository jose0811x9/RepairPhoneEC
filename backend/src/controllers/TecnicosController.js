const { sql } = require("../config/db");

const obtenerTecnicos = async (req, res) => {
    try {
        const result = await sql.query`
            SELECT * FROM Tecnicos
            ORDER BY idTecnico DESC
        `;
        res.json(result.recordset);
    } catch (error) {
        console.error('[obtenerTecnicos]', error.message);
        res.status(500).json({ mensaje: 'ERROR NO SE PUDO OBTENER TECNICOS' });
    }
};

const validarTecnico = ({ nombres, especialidad, telefono }) => {
    if (!nombres || !especialidad || !telefono) {
        return 'TODOS LOS CAMPOS SON OBLIGATORIOS';
    }
    if (nombres.trim().length < 2) {
        return 'EL NOMBRE DEBE TENER AL MENOS 2 CARACTERES';
    }
    if (especialidad.trim().length < 2) {
        return 'LA ESPECIALIDAD DEBE TENER AL MENOS 2 CARACTERES';
    }

    if (!/^\d{10}$/.test(telefono.trim())) {
        return 'TELÉFONO INVÁLIDO (solo 10 digitos)';
    }
    return null;
};

const crearTecnico = async (req, res) => {
    try {
        const { nombres, especialidad, telefono } = req.body;

        const error = validarTecnico({ nombres, especialidad, telefono });
        if (error) return res.status(400).json({ mensaje: error });

        await sql.query`
            INSERT INTO Tecnicos (nombres, especialidad, telefono)
            VALUES (${nombres.trim()}, ${especialidad.trim()}, ${telefono.trim()})
        `;
        res.status(201).json({ mensaje: 'TECNICO REGISTRADO' });

    } catch (error) {
        console.error('[crearTecnico]', error.message);
        res.status(500).json({ mensaje: 'ERROR TECNICO NO REGISTRADO' });
    }
};

const actualizarTecnico = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombres, especialidad, telefono } = req.body;

        if (!id || isNaN(id) || Number(id) <= 0) {
            return res.status(400).json({ mensaje: 'ID INVALIDO' });
        }

        const error = validarTecnico({ nombres, especialidad, telefono });
        if (error) return res.status(400).json({ mensaje: error });

        await sql.query`
            UPDATE Tecnicos
            SET
                nombres      = ${nombres.trim()},
                especialidad = ${especialidad.trim()},
                telefono     = ${telefono.trim()}
            WHERE idTecnico  = ${Number(id)}
        `;
        res.json({ mensaje: 'TECNICO ACTUALIZADO' });

    } catch (error) {
        console.error('[actualizarTecnico]', error.message);
        res.status(500).json({ mensaje: 'ERROR NO SE PUDO ACTUALIZAR' });
    }
};

const eliminarTecnico = async (req, res) => {
    try {
        const { id } = req.params;


        if (!id || isNaN(id) || Number(id) <= 0) {
            return res.status(400).json({ mensaje: 'ID INVALIDO' });
        }

        await sql.query`
            DELETE FROM Tecnicos
            WHERE idTecnico = ${Number(id)}
        `;
        res.json({ mensaje: 'TECNICO ELIMINADO' });

    } catch (error) {
        console.error('[eliminarTecnico]', error.message);
        res.status(500).json({ mensaje: 'ERROR NO SE PUDO ELIMINAR' });
    }
};

module.exports = {
    obtenerTecnicos, crearTecnico, actualizarTecnico, eliminarTecnico
};