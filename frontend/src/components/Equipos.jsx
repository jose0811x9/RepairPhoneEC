import { useEffect, useState } from "react";
import axios from "axios";

function Equipos(){

    const [equipos, setEquipos] = useState([]);
    const [clientes, setClientes] = useState([]);

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

            await axios.post(
                'http://localhost:3000/api/equipos',
                formData
            );

            alert('EQUIPO REGISTRADO');

            obtenerEquipos();

            setFormData({
                marca:'',
                modelo:'',
                imei:'',
                problema:'',
                idCliente:''
            });

        }catch(error){
            console.log(error);
        }
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
                        Guardar
                    </button>

                </form>

            </div>

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
                        </tr>
                    </thead>

                    <tbody>

                        {
                            equipos.map((equipo)=>(
                                <tr key={equipo.idEquipo}>

                                    <td>{equipo.idEquipo}</td>
                                    <td>{equipo.marca}</td>
                                    <td>{equipo.modelo}</td>
                                    <td>{equipo.imei}</td>
                                    <td>{equipo.problema}</td>
                                    <td>{equipo.nombres}</td>

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