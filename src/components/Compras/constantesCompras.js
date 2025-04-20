export const columns = [
    { field: 'producto', headerName: 'Producto', flex: 1 },
    { field: 'proveedores', headerName: 'Proveedor', flex: 1 },
    { field: 'cantidad', headerName: 'Cantidad', flex: 1 },
    { field: 'precioUnidad', headerName: 'Precio Unidad', flex: 1 },
    { field: 'costoEnvio', headerName: 'Costo envio', flex: 1 },
    { field: 'costoTotal', headerName: 'Costo total', type: 'number', flex: 1 },
    { field: 'fecha', headerName: 'Fecha', flex: 1 },
    { field: 'pendiente', headerName: 'Pendiente', flex: 1 },
    { field: 'tipoTransaccion', headerName:'Tipo Transaccion', flex: 1}
];

export  const campos = [{
    titulo: "Producto",
    id: "producto",
    placeholder: "Nombre del producto",
    type: "option"
  },
  {
    titulo: "Proveedor",
    id: "proveedores",
    placeholder: "Nombre del Proveedor",
    type: "option"
  },
  {
    titulo: "Cantidad",
    id: "cantidad",
    placeholder: "Cantidad comprada",
    type: "number"
  },
  {
    titulo: "Precio Unidad",
    id: "precioUnidad",
    placeholder: "Precio Unidad del producto",
    type: "number"
  },
  {
    titulo: "Costo envio",
    id: "costoEnvio",
    placeholder: "costo Envio de la compra",
    type: "number"
  },
  {
    titulo: "Costo total",
    id: "costoTotal",
    placeholder: "costoTotal de la compra",
    type: "text"
  },
  {
    titulo: "Fecha",
    id: "fecha",
    placeholder: "Fecha de la compra",
    type: "date"
  },
  {
    titulo: "Pendiente",
    id: "pendiente",
    placeholder: "Si la venta esta terminada",
    type: "option"
  }
  ]

