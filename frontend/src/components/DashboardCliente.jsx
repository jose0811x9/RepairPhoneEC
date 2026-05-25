function DashboardCliente(){
    const usuario = JSON.parse(
        localStorage.getItem('usuario')
    );
    return(
        <div className="container mt-4">
            <h2 className=" mb-4"> Bienvenido, {usuario?.nombre}</h2>
            <div className="row">
                <div className=" col-md-4">
                    <div className="card p-3 shadow">
                        <h4>Mis Reparaciones</h4>
                        <p>Consulta el estado de tus equipos</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3 shadow">
                        <h4>Facturas</h4>
                        <p>Consultar Facturas</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3 shadow">
                        <h4>Reservar Servicios</h4>
                        <p>Agendar Servicio</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DashboardCliente;