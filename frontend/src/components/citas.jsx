import { useEffect, useState } from "react";
import axios from "axios";


function Citas(){
    const [citas,setCitas]= useState([]);
    useEffect(()=>{
        obtenerCitas();
    }, []);
    const obtenerCitas = async()=>{
        try{
            const response = await axios.get(
                'http://localhost:3000/api/citas'
            );
            setCitas(response.data);
        }catch(error){
            console.log(error);
            alert('NO SE PUEDE CARGAR LAS CITAS')
        }
    };
    const eliminarCitas= async(id)=>{
        const confirmar = confirm(
            'Deseas eliminar esta cita'
        );
        if(!confirmar){
            return;
        }
        try{
            await axios.delete(
                `http://localhost:3000/api/citas/${id}`
            );
            alert('CITA ELIMINADA');
            obtenerCitas();
        }catch(error){
            console.log(error);
            alert('NO SE PUDO ELIMINAR');
        }
    };
    const atenterCita = async(id)=>{
        const confirmar = confirm(
            'DESEAS ATENDER ESTA CITA?'
        );
        if(!confirmar){
            return;
        }
        try{
            await axios.put(`http://localhost:3000/api/citas/atender/${id}`);
            alert('CITA ATENDIDA');
            obtenerCitas();
        }catch(error){
            console.log(error);
            alert('NOSE PUDO AGENDAR LA CITA');
        }
    };
    return(
        <div className="container mt-4">
            <div className="card p-4 shadow">
                <h2 className="mb-4">GESTION DE CITAS</h2>
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Cliente</th>
                            <th>Telefono</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Problema</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map((cita)=>(
                            <tr key={cita.idCita}>
                                <td>{cita.nombreCliente}</td>
                                <td>{cita.telefono}</td>
                                <td>{cita.marca}</td>
                                <td>{cita.modelo}</td>
                                <td>{cita.problema}</td>
                                <td>{new Date(cita.fecha).toLocaleDateString()}</td>
                                <td>
                                    {String(cita.hora).substring(11,16)}
                                </td>
                                <td>Estado</td>
                                <td>
                                    {cita.estado !== 'Atendida' && (
                                        <button className="btn btn-success btn-sm me-2" onClick={()=>atenterCita(cita.idCita)}>
                                            Atender
                                        </button>
                                    )}
                                    <button className="btn btn-danger btn-sm" onClick={()=>eliminarCitas(cita.idCita)}>
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
export default Citas;