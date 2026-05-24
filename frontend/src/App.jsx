import{BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Cliente from  './components/Cliente';
import Equipos from './components/Equipos';
import Tecnico from './components/tecnico';
import Reparaciones from './components/Reparaciones';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App(){
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  return(
    <BrowserRouter>
      <div className="container mt-4">
          <h1 className="mb-4">Repair Phone EC</h1>
          {usuario &&(
          <nav>
              <Link to="/" className='btn-secondary me-2'>
              Login
              </Link>
              <Link to="/dashboard" className='btn-secondary me-2'>
                Dashboard
              </Link>
              <Link to="/clientes" className='btn btn-primary me-2'>
                Clientes
              </Link>
              <Link to="/tecnico" className='btn btn-primary me-2'>
                Tecnicos
              </Link>
              <Link to="/equipos" className='btn btn-success'>
                Equipos
              </Link>
              <Link to="/reparaciones" className='btn btn-dark me-2'>
                Reparaciones
              </Link>
          </nav>
          )}
          <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/clientes' element={<Cliente/>}/>
              <Route path='/tecnico' element={<Tecnico/>}/>
              <Route path='/equipos' element={<Equipos/>}/>
              <Route path='/reparaciones' element={<Reparaciones/>}/>
              
          </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App;