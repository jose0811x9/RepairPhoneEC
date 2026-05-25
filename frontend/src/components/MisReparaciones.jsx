import { useEffect, useState } from "react";
import axios from "axios";
import ReparacionCard from "../components/ReparacionCard";

function MisReparaciones() {

    const [reparaciones, setReparaciones] = useState([]);

    const usuario = JSON.parse(
        localStorage.getItem('usuario')
    );

    useEffect(() => {
        obtenerMisReparaciones();
    }, []);

    const obtenerMisReparaciones = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/reparaciones/misreparaciones/${Number(usuario.idUsuario)}`
            );

            setReparaciones(response.data);

        } catch (error) {
            console.log(error);
            alert('NO SE PUDO OBTENER REPARACIONES');
        }
    };
    if (reparaciones.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h3>No tienes equipos en reparación</h3>
                <p>No tenemos registro de un celular tuyo en nuestro local</p>
            </div>
        );
    }
    return (
        <div className="container mt-4">

            <h2 className="mb-4">Mis Reparaciones</h2>

            <div className="row">
                {reparaciones.map((rep) => (
                    <div className="col-md-4 mb-3" key={rep.idReparacion}>
                        <ReparacionCard rep={rep} />
                    </div>
                ))}
            </div>

        </div>
    );
}

export default MisReparaciones;