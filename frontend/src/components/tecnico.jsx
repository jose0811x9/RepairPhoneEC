import { useEffect, useState } from "react";
import axios from 'axios';

function Tecnico() {
    const [tecnicos, setTecnicos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [idTecnico, setIdTecnico] = useState(null);
    const [formData, setFormData] = useState({  // ← corregido: setFromData → setFormData
        nombres: '', especialidad: '', telefono: ''
    });

    const obtenerTecnico = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/tecnicos');
            setTecnicos(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        obtenerTecnico();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const guardarTecnico = async (e) => {
        e.preventDefault();

        // ✅ Construir payload con .trim() — clave para que el regex del backend no falle
        const payload = {
            nombres:      formData.nombres.trim(),
            especialidad: formData.especialidad.trim(),
            telefono:     formData.telefono.trim()  // ← espacio al final rompía el regex \d{7,15}
        };

        try {
            if (editar) {
                await axios.put(
                    `http://localhost:3000/api/tecnicos/${idTecnico}`,
                    payload   // ← antes enviaba formData crudo con strings sin limpiar
                );
                alert('TECNICO ACTUALIZADO');
            } else {
                await axios.post('http://localhost:3000/api/tecnicos', payload);
                alert('TECNICO REGISTRADO');
            }

            obtenerTecnico();
            setFormData({ nombres: '', especialidad: '', telefono: '' });
            setEditar(false);
            setIdTecnico(null);

        } catch (error) {
            // ✅ Antes solo hacía console.log — ahora muestra el error real en pantalla
            alert(error.response?.data?.mensaje || 'ERROR AL GUARDAR');
            console.log(error);
        }
    };

    const eliminarTecnico = async (id) => {
        const confirmar = confirm('ELIMINAR TECNICO');
        if (!confirmar) return;
        try {
            // ✅ Bug crítico: axios.delete() estaba vacío, sin URL — nunca funcionó
            await axios.delete(`http://localhost:3000/api/tecnicos/${id}`);
            alert('TECNICO ELIMINADO');
            obtenerTecnico();
        } catch (error) {
            alert(error.response?.data?.mensaje || 'ERROR AL ELIMINAR');
            console.log(error);
        }
    };

    const editarTecnico = (tecnico) => {
        setFormData({
            nombres:      tecnico.nombres,
            especialidad: tecnico.especialidad,
            telefono:     tecnico.telefono
        });
        setEditar(true);
        setIdTecnico(tecnico.idTecnico);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Repair Phone EC</h1>

            <div className="card p-4 mb-4">
                <h3>Registrar Tecnico</h3>
                <form onSubmit={guardarTecnico}>

                    <input
                        type="text"
                        name="nombres"
                        placeholder="Nombres"
                        className="form-control mb-3"
                        value={formData.nombres}
                        onChange={handleChange}
                        required
                        minLength={2}
                    />

                    <input
                        type="text"
                        name="especialidad"
                        placeholder="Especialidad"
                        className="form-control mb-3"
                        value={formData.especialidad}
                        onChange={handleChange}
                        required
                        minLength={2}
                    />

                    <input
                        type="tel"           
                        name="telefono"
                        placeholder="Telefono (solo números)"
                        className="form-control mb-3"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        pattern="\d{10}"  
                        title="solo 10 digitos"
                    />

                    <button className="btn btn-primary">
                        {editar ? 'Actualizar' : 'Guardar'}
                    </button>

                    {editar && (
                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() => {
                                setEditar(false);
                                setIdTecnico(null);
                                setFormData({ nombres: '', especialidad: '', telefono: '' });
                            }}
                        >
                            Cancelar
                        </button>
                    )}

                </form>
            </div>

            <div className="card p-4">
                <h3>Lista de tecnicos</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombres</th>
                            <th>Especialidad</th>
                            <th>Telefono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tecnicos.map((tecnico) => (
                            <tr key={tecnico.idTecnico}>
                                <td>{tecnico.idTecnico}</td>
                                <td>{tecnico.nombres}</td>
                                <td>{tecnico.especialidad}</td>
                                <td>{tecnico.telefono}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editarTecnico(tecnico)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => eliminarTecnico(tecnico.idTecnico)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Tecnico;