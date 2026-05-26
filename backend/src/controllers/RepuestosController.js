const { sql } = require('../config/db');

const obtenerRepuesto = async (req, res) => {
    try {
        const result = await sql.query`
            SELECT * FROM Repuestos
            ORDER BY idRepuesto DESC
        `;
        res.json(result.recordset);
    } catch (error) {
        console.error('[obtenerRepuesto]', error.message);
        res.status(500).json({ mensaje: 'NO SE PUDO OBTENER REPUESTOS' });
    }
};

const validarRepuesto = ({ nombre, stock, precio }) => {

    if (!nombre || stock === undefined || stock === '' || precio === undefined || precio === '') {
        return 'TODOS LOS CAMPOS SON OBLIGATORIOS';
    }
    if (nombre.trim().length < 2) {
        return 'EL NOMBRE DEBE TENER AL MENOS 2 CARACTERES';
    }
    if (isNaN(stock) || Number(stock) < 0 || !Number.isInteger(Number(stock))) {
        return 'EL STOCK DEBE SER UN NÚMERO ENTERO NO NEGATIVO';
    }
    if (isNaN(precio) || Number(precio) <= 0) {
        return 'EL PRECIO DEBE SER MAYOR A 0';
    }
    return null;
};

const crearRepuesto = async (req, res) => {
    try {
        const { nombre, stock, precio } = req.body;

        const error = validarRepuesto({ nombre, stock, precio });
        if (error) return res.status(400).json({ mensaje: error });

        await sql.query`
            INSERT INTO Repuestos(nombre, Stock, precio)
            VALUES(${nombre.trim()}, ${Number(stock)}, ${Number(precio)})
        `;
        res.status(201).json({ mensaje: 'REPUESTO REGISTRADO' });

    } catch (error) {
        console.error('[crearRepuesto]', error.message);
        res.status(500).json({ mensaje: 'NO SE PUDO REGISTRAR' });
    }
};

const actualizarRepuesto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, stock, precio } = req.body;

        if (!id || isNaN(id) || Number(id) <= 0) {
            return res.status(400).json({ mensaje: 'ID INVALIDO' });
        }

        const error = validarRepuesto({ nombre, stock, precio });
        if (error) return res.status(400).json({ mensaje: error });

        await sql.query`
            UPDATE Repuestos
            SET
                nombre = ${nombre.trim()},
                Stock  = ${Number(stock)},
                precio = ${Number(precio)}
            WHERE idRepuesto = ${Number(id)}
        `;
        res.json({ mensaje: 'REPUESTO ACTUALIZADO' });

    } catch (error) {
        console.error('[actualizarRepuesto]', error.message);
        res.status(500).json({ mensaje: 'NO SE PUDO ACTUALIZAR' });
    }
};

const eliminarRepuesto = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id) || Number(id) <= 0) {
            return res.status(400).json({ mensaje: 'ID INVALIDO' });
        }

        await sql.query`
            DELETE FROM Repuestos
            WHERE idRepuesto = ${Number(id)}
        `;
        res.json({ mensaje: 'REPUESTO ELIMINADO' });

    } catch (error) {
        console.error('[eliminarRepuesto]', error.message);
        res.status(500).json({ mensaje: 'NO SE PUDO ELIMINAR' });
    }
};

module.exports = {
    obtenerRepuesto, crearRepuesto, actualizarRepuesto, eliminarRepuesto
};