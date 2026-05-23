import{BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Cliente from  './components/Cliente';
import Equipos from './components/Equipos';
import Tecnico from './components/tecnico';

function App(){
  return(
    <BrowserRouter>
      <div className="container mt-4">
          <h1 className="mb-4">Repair Phone EC</h1>
          <nav>
              <Link to="/clientes" className='btn btn-primary me-2'>
                Clientes
              </Link>
              <Link to="/tecnico" className='btn btn-primary me-2'>
                Tecnicos
              </Link>
              <Link to="/equipos" className='btn btn-success'>
                Equipos
              </Link>
          </nav>
          <Routes>
              <Route path='/' element={<Cliente/>}/>
              <Route path='/clientes' element={<Cliente/>}/>
              <Route path='/tecnico' element={<Tecnico/>}/>
              <Route path='/equipos' element={<Equipos/>}/>
              
          </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App;