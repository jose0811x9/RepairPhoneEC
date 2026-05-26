import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Reparaciones(){
    const navigate = useNavigate();
    const [reparaciones, setReparaciones]= useState([]);
    const [busqueda, setBusqueda] = useState('');
    const[equipos, setEquipos]= useState([]);
    const[tecnicos, setTecnicos]= useState([]);
    const[editar, setEditar]= useState(false);
    const[idReparacion, setIdReparacion]= useState(null);
    const[formData, setFormData]= useState({
        fechaIngreso:'',
        observaciones:'',
        costoManoObra:'',
        idEquipo:'',
        idTecnico:'',
        idEstado:1
    });
    const obtenerReparaciones = async()=>{
        try{
            const response = await axios.get(
                'http://localhost:3000/api/reparaciones'
            );
            setReparaciones(response.data);
        }catch(error){
            console.log(error);
        }
    };
    const obtenerEquipos = async()=>{
        try{
            const response = await axios.get(
                'http://localhost:3000/api/equipos'
            );
            setEquipos(response.data);
        }catch(error){
            console.log(error);
        }
    };
    const obtenerTecnicos = async()=>{
        try{
            const response = await axios.get(
                'http://localhost:3000/api/tecnicos'
            );
            setTecnicos(response.data);
        }catch(error){
            console.log(error);
        }
    };
    useEffect(()=>{
        obtenerReparaciones();
         obtenerTecnicos();
          obtenerEquipos();
    }, []);
    const handleChange = (e)=>{
        setFormData({
            ...formData, [e.target.name]:e.target.value
        });
    };
    const guardarReparacion = async(e)=>{
        e.preventDefault();
        try{
            if(editar){
                await axios.put(
                    `http://localhost:3000/api/reparaciones/${idReparacion}`, formData
                );
                alert('REPARACION ACTUALIZADA')
                setEditar(false);   
                setIdReparacion(null);
                
            }else{
                await axios.post(
                'http://localhost:3000/api/reparaciones', formData
                );
                alert('REPARACION REGISTRADA');
            }
            obtenerReparaciones();
            setFormData({
                fechaIngreso:'',
                observaciones:'',
                costoManoObra:'',
                idEquipo:'',
                idTecnico:'',
                idEstado:1
            });
        }catch(error){
            console.log(error);
        }
    };
    const editarReparacion = (reparacion)=>{
        
        setFormData({
            fechaIngreso: reparacion.fechaIngreso.split('T')[0],
            observaciones: reparacion.observaciones,
            costoManoObra: reparacion.costoManoObra,
            idEquipo: reparacion.idEquipo,
            idTecnico: reparacion.idTecnico,
            idEstado: reparacion.idEstado
        });
        setEditar(true);
        setIdReparacion(reparacion.idReparacion);
    };
    const eliminarReparacion= async(id)=>{
        const confirmar = confirm('¿DESEAS ELIMINAR ESTA REPARACION?');
        if(!confirmar){
            return;
        }
        try{
            await axios.delete(
                `http://localhost:3000/api/reparaciones/${id}`
            );
            alert('REPARACION ELIMINADA');
            obtenerReparaciones();
        }catch(error){
            console.log(error);
        }
    };
    return(
        <div>
            <div className="card p-4 mb-4 shadow">
                <h3>Registrar Reparaciones</h3>
                <form onSubmit={guardarReparacion}>
                    <input 
                        type="date" 
                        name="fechaIngreso"
                        className="form-control mb-3"
                        value={formData.fechaIngreso}
                        onChange={handleChange}
                        required
                     />
                    <input 
                        type="text" 
                        name="observaciones"
                        placeholder="Observaciones"
                        className="form-control mb-3"
                        value={formData.observaciones}
                        onChange={handleChange}
                        required 
                    />
                    <input 
                        type="number" 
                        name="costoManoObra"
                        placeholder="Costo mano de obra"
                        className="form-control mb-3"
                        value={formData.costoManoObra}
                        onChange={handleChange}
                        required
                    />
                    <select 
                        name="idEquipo"
                        className="form-control mb-3"
                        value={formData.idEquipo}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione equipo</option>
                        {
                            equipos.map((equipo)=>(
                                <option 
                                key={equipo.idEquipo}
                                value={equipo.idEquipo}
                                >
                                    {equipo.marca} {equipo.modelo}
                                </option>
                            ))
                        }
                    </select>
                    <select 
                        name="idTecnico" 
                        className="form-control mb-3"
                        value={formData.idTecnico}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione Tecnico</option>
                        {
                            tecnicos.map((tecnico)=>(
                                <option
                                key={tecnico.idTecnico} 
                                value={tecnico.idTecnico}
                                >
                                    {tecnico.nombres}
                                </option>
                            ))
                        }
                    </select>
                    <select 
                        name="idEstado" 
                        className="form-control mb-3"
                        value={formData.idEstado}
                        onChange={handleChange}
                    >
                        <option value="1">Recibido</option>
                        <option value="2">En revision</option>
                        <option value="3">Reparando</option>
                        <option value="4">Listo</option>
                        <option value="5">Entregado</option>
                    </select>
                    <button className="btn btn-primary">
                        {editar ? 'Actualizar' : 'Guardar'}
                    </button>
                    {editar && (
                        <button
                            type="button" className="btn btn-secondary ms-2" onClick={()=>{
                                setEditar(false);
                                setIdReparacion(null);
                                setFormData({
                                    fechaIngreso:'',
                                    observaciones:'',
                                    costoManoObra:'',
                                    idEquipo:'',
                                    idTecnico:'',
                                    idEstado:1
                                });
                            }}
                        >
                            Cancelar
                        </button>
                    )}
                </form>
            </div>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Buscar por equipo, técnico o estado"
                value={busqueda}
                onChange={(e)=>setBusqueda(e.target.value)}
            />
            <div className="card p-4 shadow">
                <h3>Lista de reparaciones</h3>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>FECHA</th>
                            <th>EQUIPO</th>
                            <th>TECNICO</th>
                            <th>OBSERVACIONES</th>
                            <th>ESTADO</th>
                            <th>COSTO</th>
                            <th>Acciones</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {reparaciones.filter((reparacion)=>`${reparacion.marca} ${reparacion.modelo}`
                            .toLowerCase()
                            .includes(busqueda.toLowerCase()) ||

                        (reparacion.tecnico || '')
                            .toLowerCase()
                            .includes(busqueda.toLowerCase()) ||

                        reparacion.nombreEstado
                            .toLowerCase()
                            .includes(busqueda.toLowerCase())
                        )
                                .map((reparacion)=>(
                                <tr key={reparacion.idReparacion}>
                                    <td>{reparacion.idReparacion}</td>
                                    <td>{new Date(reparacion.fechaIngreso).toLocaleDateString()}</td>
                                    <td>{reparacion.marca} {reparacion.modelo}</td>
                                    <td>{reparacion.tecnico}</td>
                                    <td>{reparacion.observaciones}</td>
                                    <td>
                                        <span className={
                                            reparacion.nombreEstado === 'Recibido'
                                            ?'badge bg-secondary'
                                            :reparacion.nombreEstado === 'En revision'
                                            ?'badge bg-warning text-dark'
                                            :reparacion.nombreEstado === 'Reparando'
                                            ?'badge bg-primary'
                                            :reparacion.nombreEstado === 'Listo'
                                            ?'badge bg-success'
                                            :'badge bg-dark'
                                        }>
                                            {reparacion.nombreEstado}
                                        </span>
                                    </td>
                                    <td>
                                        <div>
                                            mano obra: {' '} ${parseFloat(reparacion.costoManoObra).toFixed(2)}
                                        </div>
                                        <div>
                                            Repuesto: {' '} ${parseFloat(reparacion.totalRepuestos).toFixed(2)}
                                        </div>
                                        <strong>
                                            Total: {' '} ${parseFloat(reparacion.totalGeneral).toFixed(2)}
                                        </strong>
                                    </td>
                                    <td>
                                        <div className="d-flex flex-wrap gap-2">
                                            <button className="btn btn-warning btn-sm" onClick={() => editarReparacion(reparacion)}>
                                                Editar
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => eliminarReparacion(reparacion.idReparacion)}>
                                                Eliminar
                                            </button>
                                            <button className="btn btn-info btn-sm" onClick={() => navigate(`/detalle-repuesto/${reparacion.idReparacion}`)}>
                                                Repuestos
                                            </button>
                                            <button className="btn btn-success btn-sm" onClick={() => navigate(`/factura/${reparacion.idReparacion}`)}>
                                                Factura
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Reparaciones;