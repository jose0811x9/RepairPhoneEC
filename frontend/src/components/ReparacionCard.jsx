function ReparacionCard({ rep }) {

    // 🔥 Flujo de estados (debe coincidir con tu BD)
    const steps = [
        "Recibido",
        "En revisión",
        "En reparación",
        "Listo",
        "Entregado"
    ];

    // 🔍 posición actual del estado
    const currentIndex = steps.indexOf(rep.nombreEstado);

    return (
        <div className="card p-3 shadow mb-3 border-0">

            {/* HEADER */}
            <div className="mb-2">
                <h5 className="mb-0">
                    📱 {rep.marca} {rep.modelo}
                </h5>
                <small className="text-muted">
                    IMEI: {rep.imei}
                </small>
            </div>

            <hr />

            {/* INFO BÁSICA */}
            <p className="mb-1">
                <strong>👨‍🔧 Técnico:</strong> {rep.tecnico}
            </p>

            <p className="mb-3">
                <strong>📝 Observación:</strong> {rep.observaciones}
            </p>

            {/* 🚚 TRACKING DHL STYLE */}
            <div className="position-relative mt-4">

                {/* LINEA DE FONDO */}
                <div
                    style={{
                        position: "absolute",
                        top: "12px",
                        left: 0,
                        right: 0,
                        height: "4px",
                        backgroundColor: "#e5e5e5",
                        zIndex: 1
                    }}
                />

                {/* LINEA PROGRESO ANIMADA */}
                <div
                    style={{
                        position: "absolute",
                        top: "12px",
                        left: 0,
                        height: "4px",
                        backgroundColor: "#28a745",
                        zIndex: 2,
                        width: `${(currentIndex / (steps.length - 1)) * 100}%`,
                        transition: "width 0.6s ease-in-out"
                    }}
                />

                {/* STEPS */}
                <div className="d-flex justify-content-between position-relative" style={{ zIndex: 3 }}>

                    {steps.map((step, index) => {

                        const isActive = index <= currentIndex;

                        return (
                            <div key={step} className="text-center" style={{ width: "20%" }}>

                                {/* CIRCULO */}
                                <div
                                    style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: "50%",
                                        margin: "0 auto",
                                        backgroundColor: isActive ? "#28a745" : "#ccc",
                                        border: isActive ? "3px solid #c8f7c5" : "3px solid #eee",
                                        transition: "all 0.3s ease"
                                    }}
                                />

                                {/* LABEL */}
                                <small
                                    style={{
                                        fontSize: "11px",
                                        display: "block",
                                        marginTop: 6,
                                        color: isActive ? "#28a745" : "#999",
                                        fontWeight: isActive ? "600" : "400"
                                    }}
                                >
                                    {step}
                                </small>

                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ESTADO FINAL */}
            <div className="mt-4 text-center">
                <span className="badge bg-dark">
                    Estado actual: {rep.nombreEstado}
                </span>
            </div>

        </div>
    );
}

export default ReparacionCard;