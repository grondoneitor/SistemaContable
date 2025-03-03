// cantidad
// : 
// 123132
// entidad
// : 
// "Facundo Grondona"
// fecha
// : 
// "2025-03-25T03:00:00.000+00:00"
// id
// : 
// "V-39"
// objeto
// : 
// "ASDADS"
// pendiente
// : 
// true
// precio
// : 
// 123123
// tipoTransaccion
// : 
// "Venta"

export const columns = [
    { field: 'objeto', headerName: 'Producto', flex:2,  editable: false  },
    { field: 'cantidad', headerName: 'Cantidad', flex:1,  editable: false },
    { field: 'precio', headerName: 'Dinero',flex:1,  editable: false  },
    { field: 'fecha', headerName: 'Fecha de la transaccion',flex:1,  editable: false  },
    { field: 'pendiente', headerName: 'Pendiente',flex:1,  editable: false  },
    { field: 'tipoTransaccion', headerName: 'Tipo de transaccion',flex:1,  editable: false  }
  ];