import { useEffect, useState } from "react";
import axios from "axios";


function Equipos(){

    const [equipos, setEquipos] = useState([]);
    const [busqueda, setBusqueda] = useState('')
    const [clientes, setClientes] = useState([]);
    const [editar, setEditar] = useState(false);
    const [idEquipo, setIdEquipo] = useState(null);
    const [formData, setFormData] = useState({
        marca:'',
        modelo:'',
        imei:'',
        problema:'',
        idCliente:''
    });

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

    const obtenerClientes = async()=>{
        try{
            const response = await axios.get(
                'http://localhost:3000/api/clientes'
            );

            setClientes(response.data);

        }catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        obtenerEquipos();
        obtenerClientes();
    },[]);

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const guardarEquipo = async(e)=>{
        e.preventDefault();
        try{
            if(editar){
                await axios.put(
                    `http://localhost:3000/api/equipos/${idEquipo}`,
                    formData
                );
                alert('EQUIPO ACTUALIZADO');
            }else{
                await axios.post(
                    'http://localhost:3000/api/equipos',
                    formData
                );
                alert('EQUIPO REGISTRADO');
            }
            obtenerEquipos();
            setFormData({
                marca:'',
                modelo:'',
                imei:'',
                problema:'',
                idCliente:''
            });
            setEditar(false),
            setIdEquipo(null)
        }catch(error){
            console.log(error);
        }

    };
    const eliminarEquipo = async(id)=>{
        const confirmar = confirm('ELIMINAR EQUIPO');
        if(!confirmar){
            return;
        }
        try{
            await axios.delete(
                `http://localhost:3000/api/equipos/${id}`
            );
            alert('EQUIPO ELIMINADO');
            obtenerEquipos();
        }catch(error){
            console.log(error);
        }
    };
    const editarEquipo = (equipo)=>{
        setFormData({
            marca: equipo.marca,
            modelo:equipo.modelo,
            imei: equipo.imei,
            problema: equipo.problema,
            idCliente: equipo.idCliente
        });
        setEditar(true);
        setIdEquipo(equipo.idEquipo);
    };

    return(
        <div>

            <div className="card p-4 mb-4">

                <h3>Registrar Equipo</h3>

                <form onSubmit={guardarEquipo}>

                    <input
                        type="text"
                        name="marca"
                        placeholder="Marca"
                        className="form-control mb-3"
                        value={formData.marca}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="modelo"
                        placeholder="Modelo"
                        className="form-control mb-3"
                        value={formData.modelo}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="imei"
                        placeholder="IMEI"
                        className="form-control mb-3"
                        value={formData.imei}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="problema"
                        placeholder="Problema"
                        className="form-control mb-3"
                        value={formData.problema}
                        onChange={handleChange}
                    />

                    <select
                        name="idCliente"
                        className="form-control mb-3"
                        value={formData.idCliente}
                        onChange={handleChange}
                    >

                        <option value="">
                            Seleccione cliente
                        </option>

                        {
                            clientes.map(cliente=>(
                                <option
                                    key={cliente.idCliente}
                                    value={cliente.idCliente}
                                >
                                    {cliente.nombres}
                                </option>
                            ))
                        }

                    </select>

                    <button className="btn btn-success">
                       {editar? 'Actualizar':'Guardar'}
                    </button>

                </form>

            </div>
            <input 
                type="text"
                className="form-control mb-3"
                placeholder="Buscar por marca, modelo o IMEI"
                value={busqueda}
                onChange={(e)=>setBusqueda(e.target.value)} />
            <div className="card p-4">

                <h3>Lista de Equipos</h3>

                <table className="table">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>IMEI</th>
                            <th>Problema</th>
                            <th>Cliente</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            equipos
                            .filter((equipo)=>
                                equipo.marca.toLowerCase().includes(busqueda.toLowerCase())||
                                equipo.modelo.toLowerCase().includes(busqueda.toLowerCase())||
                                equipo.imei.toLowerCase().includes(busqueda.toLowerCase())
                            )
                            .map((equipo)=>(
                                <tr key={equipo.idEquipo}>

                                    <td>{equipo.idEquipo}</td>
                                    <td>{equipo.marca}</td>
                                    <td>{equipo.modelo}</td>
                                    <td>{equipo.imei}</td>
                                    <td>{equipo.problema}</td>
                                    <td>{equipo.nombres}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm me-2" onClick={()=>{editarEquipo(equipo)}}>
                                            Editar
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={()=>{eliminarEquipo(equipo.idEquipo)}}>
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
    );
}

export default Equipos;