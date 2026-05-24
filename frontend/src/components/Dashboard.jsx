import { use, useEffect, useState } from "react";
import axios from "axios";

function Dashboard(){
    const[totalClientes, setTotalClientes] = useState(0);
    const[totalEquipos, setTotalEquipos]= useState(0);
    const[totalTecnicos, setTotalTecnicos]= useState(0);
    const[totalReparaciones, setTotalReparaciones]= useState(0);
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    useEffect(()=>{
        cargarDatos();
    },[]);
    const cargarDatos = async()=>{
        try{
            const clientes = await axios.get("http://localhost:3000/api/clientes");
            const equipos = await axios.get("http://localhost:3000/api/equipos");
            const tecnicos = await axios.get("http://localhost:3000/api/tecnicos");
            const reparaciones = await axios.get("http://localhost:3000/api/reparaciones");

            setTotalClientes(clientes.data.length);
            setTotalEquipos(equipos.data.length);
            setTotalTecnicos(tecnicos.data.length);
            setTotalReparaciones(reparaciones.data.length);
        }catch(error){
            console.log(error);
        }
    };
    return(
        <div className="container mt-4">
            <h2>BIENVENIDO {usuario?.nombre}</h2>
            <h2 className="mb-4">Dashboard</h2>
            <p className="text-muted">
                Sistema de gestión para reparación de teléfonos móviles.
            </p>
            <div className="row justify-content-center g-3">
                <div className="col-md-3 col-sm-6">
                    <div className="card text-center bg-primary text-white">
                        <div className="card-body">
                            <h5>Clientes</h5>
                            <h2>{totalClientes}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center bg-success text-white">
                        <div className="card-body">
                            <h5>Equipos</h5>
                            <h2>{totalEquipos}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center bg-warning">
                        <div className="card-body">
                            <h5>Tecnicos</h5>
                            <h2>{totalTecnicos}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center bg-danger text white">
                        <div className="card-body">
                            <h5>Reparaciones</h5>
                            <h2>{totalReparaciones}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;