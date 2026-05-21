const sql = require('mssql/msnodesqlv8');

const config = {
    connectionString:
        "Driver={ODBC Driver 18 for SQL Server};Server=LAPTOP-PH1BTE3K\\SQLEXPRESS03;Database=RepairPhoneEC;Trusted_Connection=Yes;TrustServerCertificate=Yes;"
};

const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log('Conectado a SQL Server');
    } catch (error) {
        console.log('Error de conexión');
        console.log(error);
    }
};

module.exports = {
    sql,
    connectDB
};