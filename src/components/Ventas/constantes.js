export  const campos = [{
    titulo: "Producto",
    id: "producto",
    placeholder: "Nombre del producto",
    type: "option"
  },
  {
    titulo: "Cliente",
    id: "cliente",
    placeholder: "Nombre del cliente",
    type: "option"
  },
  {
    titulo: "Cantidad",
    id: "cantidad",
    placeholder: "Cantidad del producto",
    type: "number"
  },
  {
    titulo: "PrecioTotal",
    id: "precioTotal",
    placeholder: "Precio total de la venta",
    type: "number"
  },
  {
    titulo: "Fecha",
    id: "fecha",
    placeholder: "Fecha de la venta",
    type: "date"
  },
  {
    titulo: "Modo de pago",
    id: "modoDePago",
    placeholder: "Modo de pago de la venta",
    type: "text"
  },
  {
    titulo: "Pendiente",
    id: "pendiente",
    placeholder: "Si la venta esta terminada",
    type: "option"
  }
  ]


export const columns = [
    { field: 'producto', headerName: 'Producto', flex: 1 },
    { field: 'cliente', headerName: 'Cliente', flex: 1 },
    { field: 'cantidad', headerName: 'Cantidad', type: 'number', flex: 1 },
    { field: 'precioTotal', headerName: 'Precio total', flex: 1 },
    { field: 'fecha', headerName: 'Fecha', flex: 1 },
    { field: 'modoDePago', headerName: 'Modo de pago', flex: 1 },
    { field: 'pendiente', headerName: 'Pendiente', flex: 1 }
];
