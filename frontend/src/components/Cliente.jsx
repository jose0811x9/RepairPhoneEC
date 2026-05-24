import { useEffect, useState } from "react";
import axios from 'axios';


function Cliente(){
  const [clientes, setClientes]= useState([]);
  const [editar, setEditar]= useState(false);
  const [idCliente, setIdCliente] = useState(null)
  const [formData, setFormData]= useState({
    nombres:'', apellidos:'', telefono:'', direccion:'', correo:''
  });
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
    obtenerClientes();
  },[]);
  const handleChange = (e) =>{
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  const guardarCliente = async(e)=>{
    e.preventDefault();
    try{
      if(editar){
        await axios.put(
          `http://localhost:3000/api/clientes/${idCliente}`, formData
        );
        alert('CLIENTE ACTUALIZADO');
      }else{
        await axios.post(
          `http://localhost:3000/api/clientes`,formData
        );
        alert('CLIENTE REGISTRADO')
      }
        obtenerClientes();
        setFormData({
          nombres:'', apellidos:'', telefono:'', direccion:'', correo:'' 
        });
        setEditar(false);
        setIdCliente(null);
      }catch(error){
        console.log(error);
  
      }
    
  };
  const eliminarCliente = async(id)=>{
    const confirmar = confirm('ELIMAR ESTE CLIENTE?');
    if(!confirmar){
      return;
    }
    try{
      await axios.delete(
        `http://localhost:3000/api/clientes/${id}`
      );
      alert('CLIENTE ELIMINADO')
      obtenerClientes();
    }catch(error){
      console.log(error)
      
    }
  };
  const editarCliente = (cliente)=>{
    setFormData({
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      correo: cliente.correo
    });
    setEditar(true);
    setIdCliente(cliente.idCliente);
  };
  return(
    <div className="container mt-5">
      <h1 className="mb-4">Repair Phone EC</h1>
      <div className="card p-4 mb-4">
        <h3>Registrar cliente</h3>
        <form onSubmit={guardarCliente}>
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
            name="apellidos"
            placeholder="Apellidos"
            className="form-control mb-3"
            value={formData.apellidos}
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
          <input 
            type="text"
            name="direccion" 
            placeholder="Direccion"
            className="form-control mb-3"
            value={formData.direccion}
            onChange={handleChange}
            
          />
          <input  
            type="email"
            name="correo"
            placeholder="Correo"
            className="form-control mb-3"
            value={formData.correo}
            onChange={handleChange}
            
           />
           <button className="btn btn-primary">
            {editar? 'Actualizar':'Guardar'}
            </button>
        </form>
      </div>
      <div className="card p-4">
        <h3>Lista de clientes</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              clientes.map((cliente)=>(
                <tr key={cliente.idCliente}>
                  <td>{cliente.idCliente}</td>
                  <td>{cliente.nombres}</td>
                  <td>{cliente.apellidos}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.correo}</td>
                  <td>
                    <button className="btn btn-warning  btn-sm me-2"
                  onClick={()=>{
                      editarCliente(cliente)}}
                    > 
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm"
                      onClick={()=> eliminarCliente(cliente.idCliente)}>
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
export default Cliente;