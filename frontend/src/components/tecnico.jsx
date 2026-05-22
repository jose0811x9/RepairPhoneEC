import{useEffect, useState} from "react";
import axios from 'axios';

function Tecnicos(){
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
                await axios.post(`htpp://localhost:3000/api/tecnicos`,formData);
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
    const eliminarTecnico = async(e)=>{
        const confirmar =  confirm('ELIMINAR TECNICO');
        if(!confirmar){
            return;
        }
        try{
            await axios.delete(
                `htpp://localhost/api/tecnicos/${id}`
            );
            alert('CLIENTE ELIMINADO');
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
        setEditar();
        setIdTecnico(tecnico.idTecnico);
    };
    
}