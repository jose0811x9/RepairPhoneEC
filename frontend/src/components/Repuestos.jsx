import { useEffect, useState } from "react";
import axios from 'axios';

function Repuesto() {
    const [repuestos, setRepuestos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [idRepuesto, setIdRepuesto] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        stock: '',
        precio: ''
    });

    const obtenerRepuesto = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/repuestos');
            setRepuestos(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        obtenerRepuesto();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const construirPayload = () => ({
        nombre: formData.nombre.trim(),
        stock: parseInt(formData.stock, 10),    
        precio: parseFloat(formData.precio)       
    });

    const guardarRepuesto = async (e) => {
        e.preventDefault();

        if (!formData.nombre || formData.stock === '' || formData.precio === '') {
            alert('TODOS LOS CAMPOS SON OBLIGATORIOS');
            return;
        }
        if (parseInt(formData.stock, 10) < 0 || !Number.isInteger(parseFloat(formData.stock))) {
            alert('EL STOCK DEBE SER UN NÚMERO ENTERO NO NEGATIVO');
            return;
        }
        if (parseFloat(formData.precio) <= 0) {
            alert('EL PRECIO DEBE SER MAYOR A 0');
            return;
        }

        const payload = construirPayload();

        try {
            if (editar) {
                await axios.put(
                    `http://localhost:3000/api/repuestos/${idRepuesto}`,
                    payload   // ← antes enviaba formData crudo (strings)
                );
                alert('REPUESTO ACTUALIZADO');
            } else {
                await axios.post('http://localhost:3000/api/repuestos', payload);
                alert('REPUESTO REGISTRADO');
            }

            obtenerRepuesto();
            setFormData({ nombre: '', stock: '', precio: '' });
            setEditar(false);
            setIdRepuesto(null);

        } catch (error) {
            alert(error.response?.data?.mensaje || 'ERROR AL GUARDAR');
            console.log(error);
        }
    };

    const editarRepuesto = (repuesto) => {
        setFormData({
            nombre: repuesto.nombre,
            stock: repuesto.Stock,
            precio: repuesto.precio
        });
        setEditar(true);
        setIdRepuesto(repuesto.idRepuesto);
    };

    const eliminarRepuesto = async (id) => {
        const confirmar = confirm('¿DESEA ELIMINAR ESTE REPUESTO?');
        if (!confirmar) return;
        try {
            await axios.delete(`http://localhost:3000/api/repuestos/${id}`);
            alert('REPUESTO ELIMINADO');
            obtenerRepuesto();
        } catch (error) {
            alert(error.response?.data?.mensaje || 'ERROR AL ELIMINAR');
            console.log(error);
        }
    };

    return (
        <div>
            <div className="card p-4 mb-4">
                <h3>Registrar Repuesto</h3>
                <form onSubmit={guardarRepuesto}>

                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        className="form-control mb-3"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        minLength={2}
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        className="form-control mb-3"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                        min="0"
                        step="1"       
                    />

                    <input
                        type="number"
                        name="precio"
                        placeholder="Precio"
                        className="form-control mb-3"
                        value={formData.precio}
                        onChange={handleChange}
                        required
                        min="0.01"
                        step="0.01"
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
                                setIdRepuesto(null);
                                setFormData({ nombre: '', stock: '', precio: '' });
                            }}
                        >
                            Cancelar
                        </button>
                    )}

                </form>
            </div>

            <div className="card p-4">
                <h3>Lista de Repuestos</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>STOCK</th>
                            <th>PRECIO</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repuestos.map((repuesto) => (
                            <tr key={repuesto.idRepuesto}>
                                <td>{repuesto.idRepuesto}</td>
                                <td>{repuesto.nombre}</td>
                                <td>{repuesto.Stock}</td>
                                <td>${parseFloat(repuesto.precio).toFixed(2)}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editarRepuesto(repuesto)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => eliminarRepuesto(repuesto.idRepuesto)}
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

export default Repuesto;