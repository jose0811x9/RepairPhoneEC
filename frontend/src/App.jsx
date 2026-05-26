import{BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cliente from  './components/Cliente';
import Citas from './components/citas';
import ReservarCita from './components/ReservarCita';
import Equipos from './components/Equipos';
import Tecnico from './components/tecnico';
import Reparaciones from './components/Reparaciones';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ConsultarReparacion from './components/ConsultarReparacion';
import Repuestos from './components/Repuestos';
import DetalleRepuesto from './components/DetalleRepuesto';
import Factura from './components/Factura';

function App(){
  const [usuario, setUsuario] = useState(null);
  useEffect(()=>{
    const usuarioGuardado = JSON.parse(
      localStorage.getItem('usuario')
    );
    setUsuario(usuarioGuardado);
  },[]);
  const cerrarSesion = ()=>{localStorage.removeItem('usuario');
    window.location.href= '/';
  };
  return(
    <BrowserRouter>
      <div className="container mt-4">
          <h1 className="mb-4">Repair Phone EC</h1>
          {!usuario && ( 
          <div className='mb-4'>
            <Link to="/reservar-cita" className='btn btn-info me-2'>
                Reservar Citas
            </Link>
            <Link to="/consultar-reparacion" className='btn btn-success me-2'>
              Consultar Reparación
            </Link>
          </div>
          )}
          {usuario &&(
          <nav>
              <Link to="/dashboard" className='btn btn-secondary me-2'>
                Dashboard
              </Link>
              {usuario?.nombreRol === 'Administrador' && (<>
                <Link to="/clientes" className='btn btn-primary me-2'>
                  Clientes
                </Link>
                <Link to="/tecnico" className='btn btn-primary me-2'>
                  Tecnicos
                </Link>
                <Link to="/equipos" className='btn btn-success me-2'>
                  Equipos
                </Link>
                <Link to="/repuestos" className='btn btn-info me-2'>
                  Repuestos
                </Link>
                </>
              )}
              {(usuario?.nombreRol === 'Administrador' || usuario?.nombreRol === 'Tecnico') &&(
                <Link to="/reparaciones" className='btn btn-dark me-2'>
                  Reparaciones
                </Link>
              )}
              <Link to="/citas" className='btn btn-warning me-2'>
                  Citas
                </Link>
              
              <button className='btn btn-danger' onClick={cerrarSesion}>
                Cerrar Sesion
              </button>
          </nav>
          )}
          <Routes>
              <Route path='/' element={usuario? <Dashboard/>: <Login/>}/>
              <Route path='/dashboard' element={
                usuario?( <Dashboard/>):<Login/>}/>
              <Route path='/clientes' element={usuario?.nombreRol === 'Administrador'? <Cliente/>: <Login/>}/>
              <Route path='/reservar-cita' element={<ReservarCita/>}/>
              <Route path='/tecnico' element={usuario?.nombreRol === 'Administrador'? <Tecnico/>: <Login/>}/>
              <Route path='/equipos' element={usuario?.nombreRol === 'Administrador'? <Equipos/>: <Login/>}/>
              <Route path='/repuestos' element={usuario?.nombreRol === 'Administrador'?<Repuestos/>: <Login/>}/>
              <Route path='/reparaciones' element={usuario && (usuario?.nombreRol === 'Administrador' || usuario?.nombreRol == 'Tecnico')? <Reparaciones/>: <Login/>}/>
              <Route path='/detalle-repuesto/:idReparacion' element={usuario && (usuario?.nombreRol === 'Administrador'|| usuario?.nombreRol === 'Tecnico' )?<DetalleRepuesto />:<Login/>}/>
              <Route path='/citas' element={usuario && (usuario?.nombreRol === 'Administrador' || usuario?.nombreRol == 'Tecnico')? <Citas/>: <Login/>}/>
              <Route path='/consultar-reparacion' element={<ConsultarReparacion/>}/>
              <Route path='/factura/:idReparacion' element={usuario &&(usuario?.nombreRol === 'Administrador' || usuario?.nombreRol === 'Tecnico')?<Factura/>: <Login/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App;