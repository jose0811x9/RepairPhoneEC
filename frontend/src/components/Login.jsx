import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login(){
    const [formData, setFormData] = useState({
        correo : '',
        contrasena: ''
    });
    const handleChange = (e)=>{
        setFormData({
            ...formData, [e.target.name]:e.target.value
        });
    };
    const iniciarSesion= async(e)=>{
        e.preventDefault();
        if(!formData.correo || !formData.contrasena){
                alert('complete los campos')
                return;
            } 
        try{
            const response = await axios.post('http://localhost:3000/api/login',formData);
               
            localStorage.setItem(
                'usuario',JSON.stringify(response.data)
            );
            alert('Bienvenido');
            window.location.href = '/dashboard';
        }catch(error){
            if(error.response){
                alert(error.response.data.mensaje);
            }else{
                alert('ERROR DEL SISTEMA');
            } 
            console.log(error);
        }
    };
    return(
        <div className="container mt-5">
            <div className="card p-4">
                <h3>INICIAR SESION</h3>
                <form onSubmit={iniciarSesion}>
                    <input 
                    type="email" 
                    name="correo" 
                    placeholder="Correo"
                    className="form-control mb-3"
                    value={formData.correo}
                    onChange={handleChange} 
                    />
                    <input 
                    type="password" 
                    name="contrasena" 
                    placeholder="Contraseña"
                    className="form-control mb-3"
                    value={formData.contrasena}
                    onChange={handleChange} 
                    />
                    <button className="btn btn-primary">
                        Ingresar
                    </button>
                    
                </form>
            </div>
        </div>
    );
}
export default Login;