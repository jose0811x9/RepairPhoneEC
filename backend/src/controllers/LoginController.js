const {sql} = require('../config/db');
const login =async(req, res)=>{
    try{
        const {correo, contrasena} = req.body;
        const result = await sql.query`
            SELECT 
                Usuarios.idUsuario,
                Usuarios.nombre,
                Usuarios.apellido,
                Usuarios.correo,
                Roles.nombreRol
            FROM Usuarios
            INNER JOIN Roles ON Usuarios.idRol = Roles.idRol
            WHERE correo = ${correo} AND contrasena = ${contrasena}
        `;
        if(result.recordset.length===0){
            return res.status(401).json({
                mensaje:'CORREO O CONTRASEÑA INCORRECTA'
            });
        }
        const usuario = result.recordset[0];
        if(usuario.nombreRol === 'Cliente'){
            return res.status(403).json({
                mensaje: 'ACCESO DENEGADO'
            });
        }
        res.json(usuario);
    }catch(error){
        console.log(error.message);
        console.log(error);
        res.status(500).json({
            mensaje:'ERROR DEL SISTEMA'
        });
    }
};
module.exports = {login};