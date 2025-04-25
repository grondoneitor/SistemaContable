
export const campos = [{
    titulo: "Producto",
    id: "producto",
    placeholder: "Nombre del producto",
    type: "text"
  },
  {
    titulo: "Descripcion",
    id: "descripcion",
    placeholder: "Descripcion del producto",
    type: "text"
  },
  {
    titulo: "Precio",
    id: "precio",
    placeholder: "Precio del producto",
    type: "number"
  },
  {
    titulo: "Stock",
    id: "stock",
    placeholder: "Stock del producto",
    type: "number"
  },
  {
    titulo: "Stock Minimo",
    id: "stock_Min",
    placeholder: "Stock minimo del producto",
    type: "number"
  },
  {
    titulo: "Categoria",
    id: "categoria",
    placeholder: "Categoria del producto",
    type: "option"
  }
  ]

 export const columns = [
    { field: 'producto', headerName: 'Producto', flex: 1 },
    { field: 'descripcion', headerName: 'Descripcion', flex: 1 },
    { field: 'precio', headerName: 'Precio', flex: 1 },
    { field: 'stock', headerName: 'Stock', flex: 1 },
    { field: 'stock_Min', headerName: 'Stock Mininmo', flex: 1 },
    { field: 'categoria', headerName: 'Categoria', flex: 1 },
  ];
  