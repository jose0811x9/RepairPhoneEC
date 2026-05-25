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
                                <td>{new Date(cita.hora).toLocaleTimeString([],{
                                        hour:'2-digit',
                                        minute:'2-digit'
                                        })
                                    }
                                </td>
                                <td>
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