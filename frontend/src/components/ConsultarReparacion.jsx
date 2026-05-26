import { useState } from "react";
import{Link} from "react-router-dom";
import axios from "axios";

function ConsultarReparacion(){

    const [imei, setImei] = useState('');
    const [reparaciones, setReparaciones] = useState([]);

    const consultar = async()=>{

        if(!imei){
            alert('Ingrese IMEI');
            return;
        }

        try{

            const response = await axios.get(
                `http://localhost:3000/api/reparaciones/consultar/${imei}`
            );

            setReparaciones(response.data);

        }catch(error){
            console.log(error);
            alert('ERROR AL CONSULTAR');
        }
    };

    return(
        <div className="container mt-5">
            <div className="mb-3">
                <Link to="/" className="btn btn-secondary">
                    ← Volver al Inicio
                </Link>
            </div>
            <div className="card p-4 shadow">

                <h2 className="mb-4">
                    Consultar Estado de Reparación
                </h2>

                <div className="row">

                    <div className="col-md-10">
                        <input
                            type="text"
                            placeholder="Ingrese IMEI"
                            className="form-control"
                            value={imei}
                            onChange={(e)=>setImei(e.target.value)}
                        />
                    </div>

                    <div className="col-md-2">
                        <button
                            className="btn btn-primary w-100"
                            onClick={consultar}
                        >
                            Buscar
                        </button>
                    </div>

                </div>

            </div>

            {
                reparaciones.length > 0 && (

                    <div className="card p-4 mt-4 shadow">

                        <h3>Resultado</h3>

                        {
                            reparaciones.map((rep)=>(

                                <div
                                    key={rep.idReparacion}
                                    className="border rounded p-3 mb-3"
                                >

                                    <h5>
                                        {rep.marca} {rep.modelo}
                                    </h5>

                                    <p>
                                        <strong>IMEI:</strong> {rep.imei}
                                    </p>

                                    <p>
                                        <strong>Estado:</strong>
                                        {' '}
                                        <span className={
                                            rep.nombreEstado === 'Recibido'
                                            ? 'badge bg-secondary'
                                            : rep.nombreEstado === 'En revision'
                                            ? 'badge bg-warning text-dark'
                                            : rep.nombreEstado === 'Reparando'
                                            ? 'badge bg-primary'
                                            : rep.nombreEstado === 'Listo'
                                            ? 'badge bg-success'
                                            : 'badge bg-dark'
                                        }>
                                            {rep.nombreEstado}
                                        </span>
                                    </p>

                                    <p>
                                        <strong>Técnico:</strong>
                                        {' '}
                                        {rep.tecnico || 'No asignado'}
                                    </p>

                                    <p>
                                        <strong>Observaciones:</strong>
                                        {' '}
                                        {rep.observaciones}
                                    </p>

                                    <p>
                                        <strong>Costo:</strong>
                                        {' '}
                                        ${rep.costoManoObra}
                                    </p>

                                </div>
                            ))
                        }

                    </div>
                )
            }

        </div>
    );
}

export default ConsultarReparacion;