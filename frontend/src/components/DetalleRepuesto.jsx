import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function DetalleRepuesto() {

    const { idReparacion } = useParams();
    const navigate = useNavigate();

    const [detalle, setDetalle] = useState([]);
    const [repuestos, setRepuestos] = useState([]);

    const [formData, setFormData] = useState({
        idRepuesto: '',
        cantidad: ''
    });

    const obtenerDetalle = async () => {

        try {

            const response = await axios.get(
                `http://localhost:3000/api/detalle-repuesto/${idReparacion}`
            );

            setDetalle(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const obtenerRepuestos = async () => {

        try {

            const response = await axios.get(
                'http://localhost:3000/api/repuestos'
            );

            setRepuestos(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        obtenerDetalle();
        obtenerRepuestos();

    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const guardarDetalle = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                'http://localhost:3000/api/detalle-repuesto',
                {
                    idReparacion,
                    idRepuesto: formData.idRepuesto,
                    cantidad: formData.cantidad
                }
            );

            alert('REPUESTO AGREGADO');

            setFormData({
                idRepuesto: '',
                cantidad: ''
            });

            obtenerDetalle();
            obtenerRepuestos();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.mensaje ||
                'ERROR AL AGREGAR REPUESTO'
            );
        }
    };

   const totalRepuestos = detalle.reduce(
        (total, item) =>
            total +
            (
                parseFloat(item.precioUnitario) *
                parseInt(item.cantidad)
            ),
        0
    );

    return (
        <div>

            <div className="card p-4 shadow mb-4">

                <h3>
                    Repuestos de reparación #{idReparacion}
                </h3>

                <form onSubmit={guardarDetalle}>

                    <select
                        name="idRepuesto"
                        className="form-control mb-3"
                        value={formData.idRepuesto}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Seleccione un repuesto
                        </option>

                        {
                            repuestos.map((repuesto) => (

                                <option
                                    key={repuesto.idRepuesto}
                                    value={repuesto.idRepuesto}
                                >
                                    {repuesto.nombre}
                                    {" - "}
                                    Stock:
                                    {repuesto.Stock}
                                    {" - $"}
                                    {repuesto.precio}
                                </option>
                            ))
                        }

                    </select>

                    <input
                        type="number"
                        name="cantidad"
                        placeholder="Cantidad"
                        className="form-control mb-3"
                        value={formData.cantidad}
                        onChange={handleChange}
                        required
                    />

                    <button className="btn btn-primary me-2">
                        Agregar repuesto
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/reparaciones')}
                    >
                        Volver
                    </button>

                </form>
            </div>

            <div className="card p-4 shadow">

                <h3>Repuestos usados</h3>

                <table className="table table-bordered">

                    <thead>
                        <tr>
                            <th>REPUESTO</th>
                            <th>CANTIDAD</th>
                            <th>PRECIO</th>
                            <th>SUBTOTAL</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            detalle.map((item) => (

                                <tr key={item.idDetalle}>

                                    <td>
                                        {item.nombre}
                                    </td>

                                    <td>
                                        {item.cantidad}
                                    </td>
                                    <td>
                                        ${parseFloat(item.precioUnitario).toFixed(2)}
                                    </td>
                                    <td>
                                        ${(
                                            parseFloat(item.precioUnitario)* parseInt(item.cantidad)).toFixed(2)}
                                    </td>


                                </tr>
                            ))
                        }

                    </tbody>

                </table>

                <h4 className="text-end mt-3">
                    Total repuestos:
                    {' '}
                    $
                    {totalRepuestos.toFixed(2)}
                </h4>

            </div>

        </div>
    );
}

export default DetalleRepuesto;