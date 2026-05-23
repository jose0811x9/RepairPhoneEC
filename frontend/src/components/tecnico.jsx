import{useEffect, useState} from "react";
import axios from 'axios';

function Tecnico(){
    const[tecnicos, setTecnicos] = useState([]);
    const[editar, setEditar]= useState(false);
    const[idTecnico, setIdTecnico]= useState(null);
    const[formData, setFromData]= useState({
        nombres:'', especialidad:'', telefono:''
    });
    const obtenerTecnico= async()=>{
        try{
            const response = await axios.get('http://localhost:3000/api/tecnicos');
            setTecnicos(response.data);
        }catch(error){
            console.log(error);
        }
    };
    useEffect(()=>{
        obtenerTecnico();
    },[]);
    const handleChange = (e)=>{
        setFromData({
            ... formData, [e.target.name]: e.target.value
        });
    };
    const guardarTecnico=async(e)=>{
        e.preventDefault();
        try{
            if(editar){
                await axios.put(`http://localhost:3000/api/tecnicos/${idTecnico}`,formData);
                alert('TECNICO ACTUALIZADO')
            }else{
                await axios.post(`http://localhost:3000/api/tecnicos`,formData);
                alert('TECNICO REGISTRADO')
            }
            obtenerTecnico();
            setFromData({
                nombres:'', especialidad:'', telefono:''
            });
            setEditar(false);
            setIdTecnico(null);
        }catch(error){
            console.log(error);
        }
    }
    const eliminarTecnico = async(id)=>{
        const confirmar =  confirm('ELIMINAR TECNICO');
        if(!confirmar){
            return;
        }
        try{
            await axios.delete(
                `http://localhost:3000/api/tecnicos/${id}`
            );
            alert('TECNICO ELIMINADO');
            obtenerTecnico();
        }catch(error){
            console.log(error);
        }
    };
    const editarTecnico = (tecnico)=>{
        setFromData({
            nombres: tecnico.nombres,
            especialidad: tecnico.especialidad,
            telefono: tecnico.telefono
        });
        setEditar(true);
        setIdTecnico(tecnico.idTecnico);
    };
    return(
        <div className="container mt-5">
            <h1 className="mb-4">Repair Phone EC</h1>
            <div>
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
                     />

                    <input 
                        type="text"
                        name="especialidad"
                        placeholder="Especialidad"  
                        className="form-control mb-3"
                        value={formData.especialidad}
                        onChange={handleChange}
                        required
                    />

                    <input 
                        type="text" 
                        name="telefono"
                        placeholder="Telefono"
                        className="form-control mb-3"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                    />
                    <button className="btn btn-primary">Guardar</button>
                </form>
            </div>
            <div className="card p-4">
                <h3>Lista de tecnicos</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nombres</th>
                            <th>Especialidad</th>
                            <th>Telefono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tecnicos.map((tecnicos)=>(
                                <tr key={tecnicos.idTecnico}>
                                    <td>{tecnicos.idTecnico}</td>
                                    <td>{tecnicos.nombres}</td>
                                    <td>{tecnicos.especialidad}</td>
                                    <td>{tecnicos.telefono}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm me-2" onClick={()=>{editarTecnico(tecnicos)}}>
                                            Editar
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={()=>{eliminarTecnico(tecnicos.idTecnico)}}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Tecnico;