<select name="idCliente" id="form-control">
    <option value="">Seleccione cliente</option>
    {
        cliente.map(cliente=>(
            <option key={cliente.idCliente} value={cliente.idCliente}>
                {cliente.nombres}
            </option>
        ))
    }

</select>