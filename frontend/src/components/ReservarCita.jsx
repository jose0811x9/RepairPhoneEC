import{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ReservarCita(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombreCliente:'',
        telefono:'',
        marca:'',
        modelo:'',
        problema:'',
        fecha:'',
        hora:''
    });
    const handleChange = (e)=>{
        setFormData({
            ...formData,[e.target.name]: e.target.value
        });
    };
    const guardarCitas = async(e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:3000/api/citas', formData);
            alert('CITA REGISTRADA');
            navigate('/');
            setFormData({
                nombreCliente:'',
                telefono:'',
                marca:'',
                modelo:'',
                problema:'',
                fecha:'',
                hora:''
            });

        }catch(error){
            console.log(error);
            alert('NO SE PUDO REGISTRAR LA CITA');
        }
    };
    return(
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h2 className="mb-4 text-center">Reservar Cita</h2>
                <form onSubmit={guardarCitas}>
                    <input 
                        type="text"
                        name="nombreCliente"
                        placeholder="Nombre Completo"
                        className="form-control mb-3"
                        value={formData.nombreCliente}
                        onChange={handleChange}
                    />  
                    <input 
                        type="text"
                        name="telefono"
                        placeholder="Telefono"
                        className="form-control mb-3"
                        value={formData.telefono}
                        onChange={handleChange}     
                    />
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

                    <textarea
                        name="problema"
                        placeholder="Describa el problema"
                        className="form-control mb-3"
                        value={formData.problema}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="fecha"
                        className="form-control mb-3"
                        value={formData.fecha}
                        onChange={handleChange}
                    />

                    <input
                        type="time"
                        name="hora"
                        className="form-control mb-3"
                        value={formData.hora}
                        onChange={handleChange}
                    />
                    <button className="btn btn-primary w-100">Reservar Cita</button>
                    <button type="button" 
                    className="btn btn-secondary w-100 mt-2" 
                    onClick={() => navigate('/')}
                    >
                        Regresar
                    </button>
                </form>
            </div>
        </div>

    );
}
export default ReservarCita;