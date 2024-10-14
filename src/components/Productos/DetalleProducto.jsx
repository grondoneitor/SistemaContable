import { useParams } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../services/mayusculaPrimeraLetra';
import { ServiciosDetalleProducto } from '../../services/serviciosDetalleProducto';
import { useEffect, useState } from 'react';
import { useElegirCategorias } from '../../hooks/useElegirCategorias';
function DetalleProducto() {
    const { id } = useParams();
    const { handleDelete, handleModificar, productosId } = ServiciosDetalleProducto(id)
    const nombreProducto = capitalizeFirstLetter(productosId.producto)
    const { state } = useElegirCategorias()


    const [selectedCategoria, setSelectedCategoria] = useState('');

    useEffect(() => {
        if (productosId.categoria) {
            setSelectedCategoria(productosId.categoria);
        }
    }, [productosId]);

     const handleSelectChange = (event) => {
         const value = event.target.value;
         setSelectedCategoria(value);
     };

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>
            <h1 className='text-xl font-bold'>{nombreProducto}</h1>

            <div className='flex justify-center items-center gap-4 border border-indigo-800'>
                <img
                    className='w-1/3 h-full'
                    src="https://fotos.perfil.com/2021/11/30/trim/987/555/yerba-mate-20211130-1277185.jpg?webp"
                    alt="Imagen producto"
                />

                <div className='text-center w-2/3'>
                    <form onSubmit={handleModificar} className="bg-white shadow-md rounded-lg py-4 px-5 border border-indigo-800">
                        <div className="mb-2">
                            <label htmlFor="producto" className="text-sm uppercase font-bold">Producto</label>
                            <input
                                id="producto"
                                className="w-full p-3 border border-gray-100"
                                type="text"
                                name="producto"
                                defaultValue={nombreProducto}
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="precio" className="text-sm uppercase font-bold">Precio</label>
                            <input
                                id="precio"
                                className="w-full p-3 border border-gray-100"
                                name="precio"
                                type="number"
                                defaultValue={productosId.precio}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="categoria" className="text-sm uppercase font-bold">Categoria</label>
                            <select
                                id="categoria"
                                name="categoria"
                                className="w-full p-3 border border-gray-100"
                                value={selectedCategoria}
                                onChange={handleSelectChange}
                            >
                                {state.categorias.map(cat => (
                                    <option key={cat.id_Categoria} value={cat.id_Categoria}>
                                        {capitalizeFirstLetter(cat.categoria)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="descripcion" className="text-sm uppercase font-bold">Descripción</label>
                            <textarea
                                id="descripcion"
                                className="w-full p-3 border border-gray-100"
                                name="descripcion"
                                defaultValue={productosId.descripcion}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="stock" className="text-sm uppercase font-bold">Stock Actual</label>
                            <input
                                id="stock"
                                className="w-full p-3 border border-gray-100"
                                name="stock"
                                type="number"
                                defaultValue={productosId.stock}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="stock_Min" className="text-sm uppercase font-bold">Stock mínimo</label>
                            <input
                                id="stock_Min"
                                type="number"
                                className="w-full p-3 border border-gray-100"
                                name="stock_Min"
                                defaultValue={productosId.stock_Min}
                            />
                        </div>

                        <div className='flex gap-1'>
                            <button
                                type="submit"
                                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                            >
                                Editar Producto
                            </button>
                            <button
                                type="button"
                                className="bg-red-600 w-full p-3 text-white uppercase font-bold hover:bg-red-700 cursor-pointer transition-colors"
                                onClick={handleDelete}
                            >
                                Eliminar Producto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DetalleProducto;
