import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Factura() {

    const { idReparacion } = useParams();
    const navigate = useNavigate();

    const [factura, setFactura] = useState(null);
    const [loading, setLoading] = useState(true);

    const obtenerFactura = async () => {

        try {

            const response = await axios.get(
                `http://localhost:3000/api/facturas/${idReparacion}`
            );

            setFactura(response.data);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.mensaje ||
                'NO SE PUDO OBTENER FACTURA'
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerFactura();
    }, []);

    const guardarFactura = async () => {

        try {

            await axios.post(
                'http://localhost:3000/api/facturas',
                {
                    idReparacion,
                    subtotal: factura.subtotal,
                    iva: factura.iva,
                    total: factura.total
                }
            );

            alert('FACTURA GUARDADA');

            navigate('/reparaciones');

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.mensaje ||
                'NO SE PUDO GUARDAR'
            );
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <h3>Cargando factura...</h3>
            </div>
        );
    }

    if (!factura) {
        return (
            <div className="text-center mt-5">
                <h3>No hay datos</h3>
            </div>
        );
    }

    return (
        <div className="container mt-4">

            <div
                className="card shadow-lg border-0 mx-auto"
                style={{ maxWidth: '1100px' }}
            >

                <div className="card-body p-5">

                    <div className="text-center mb-4">

                        <h1 className="fw-bold">
                            Repair Phone EC
                        </h1>

                        <h4 className="text-muted">
                            Factura de reparación
                        </h4>

                        <h5 className="badge bg-dark p-2 mt-2">
                            Reparación #{idReparacion}
                        </h5>

                    </div>

                    <hr className="mb-4" />

                    <div className="row g-4 mb-4">

                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">

                                    <h5 className="fw-bold">
                                        Cliente
                                    </h5>

                                    <p className="mb-0">
                                        {factura.reparacion.cliente}
                                    </p>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">

                                    <h5 className="fw-bold">
                                        Equipo
                                    </h5>

                                    <p className="mb-0">
                                        {factura.reparacion.marca}
                                        {' '}
                                        {factura.reparacion.modelo}
                                    </p>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">

                                    <h5 className="fw-bold">
                                        Técnico
                                    </h5>

                                    <p className="mb-0">
                                        {
                                            factura.reparacion.tecnico
                                            || 'Sin técnico'
                                        }
                                    </p>

                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="card shadow-sm mb-4">

                        <div className="card-body">

                            <h4 className="fw-bold mb-3">
                                Mano de obra
                            </h4>

                            <h3 className="text-primary mb-0">
                                $
                                {parseFloat(
                                    factura.reparacion.costoManoObra
                                ).toFixed(2)}
                            </h3>

                        </div>

                    </div>

                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h4 className="fw-bold mb-3">
                                Repuestos usados
                            </h4>

                            <div className="table-responsive">

                                <table className="table table-hover table-bordered align-middle">

                                    <thead className="table-dark">
                                        <tr>
                                            <th>REPUESTO</th>
                                            <th>CANTIDAD</th>
                                            <th>PRECIO</th>
                                            <th>SUBTOTAL</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {
                                            factura.repuestos.length > 0
                                                ? (
                                                    factura.repuestos.map(
                                                        (item, index) => (
                                                            <tr key={index}>

                                                                <td>
                                                                    {item.nombre}
                                                                </td>

                                                                <td>
                                                                    {item.cantidad}
                                                                </td>

                                                                <td>
                                                                    $
                                                                    {parseFloat(
                                                                        item.precioUnitario
                                                                    ).toFixed(2)}
                                                                </td>

                                                                <td>
                                                                    $
                                                                    {parseFloat(
                                                                        item.subtotal
                                                                    ).toFixed(2)}
                                                                </td>

                                                            </tr>
                                                        )
                                                    )
                                                )
                                                : (
                                                    <tr>
                                                        <td
                                                            colSpan="4"
                                                            className="text-center"
                                                        >
                                                            No hay repuestos registrados
                                                        </td>
                                                    </tr>
                                                )
                                        }

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                    <div className="row justify-content-end mt-4">

                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm">

                                <div className="card-body">

                                    <div className="d-flex justify-content-between mb-2">
                                        <h5>Subtotal:</h5>
                                        <h5>
                                            $
                                            {factura.subtotal.toFixed(2)}
                                        </h5>
                                    </div>

                                    <div className="d-flex justify-content-between mb-2">
                                        <h5>IVA (15%):</h5>
                                        <h5>
                                            $
                                            {factura.iva.toFixed(2)}
                                        </h5>
                                    </div>

                                    <hr />

                                    <div className="d-flex justify-content-between">
                                        <h3 className="fw-bold">
                                            TOTAL:
                                        </h3>

                                        <h3 className="fw-bold text-success">
                                            $
                                            {factura.total.toFixed(2)}
                                        </h3>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-4">

                        <button
                            className="btn btn-success btn-lg"
                            onClick={guardarFactura}
                        >
                            Guardar factura
                        </button>

                        <button
                            className="btn btn-secondary btn-lg"
                            onClick={() =>
                                navigate('/reparaciones')
                            }
                        >
                            Volver
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Factura;