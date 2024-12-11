import { capitalizeFirstLetter } from '../../services/mayusculaPrimeraLetra';
import { ServiciosDetalleProducto } from '../../services/serviciosDetalleProducto';
import { useContext, useEffect, useState } from 'react';
import { CategoriaContext } from '../../context/categorias';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from "../../services/validaciones";
import { ModalContext } from '../../context/modal';
import '../../buttonCerrarStyle.css'

function DetalleProducto(selected) {
    const id = selected.selected
    const { productosId, onSubmitModificar, handleDelete } = ServiciosDetalleProducto(id);
    const { state } = useContext(CategoriaContext);
    const { closeModal } = useContext(ModalContext)
    const [selectedCategoria, setSelectedCategoria] = useState('');
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    useEffect(() => {
        if (productosId) {
            reset({
                producto: capitalizeFirstLetter(productosId.producto),
                precio: productosId.precio,
                categoria: productosId.categoria,
                descripcion: productosId.descripcion,
                stock: productosId.stock,
                stock_Min: productosId.stock_Min,
            });
            setSelectedCategoria(productosId.categoria);
        }
    }, [productosId, reset]);

    const handleSelectChange = (event) => {
        setSelectedCategoria(event.target.value);
    };

    return (
        <div className='flex flex-col justify-center items-center w-screen h-screen '>

            <div className='flex justify-center items-center gap-4 w-2/3 '>
                <div className='text-center w-2/3'>
                    <form
                        onSubmit={handleSubmit((data) => {
                            onSubmitModificar(data),
                                closeModal()
                        })}
                        className="bg-white shadow-md rounded-lg py-4 px-5 border border-indigo-800">

                        <div className="mb-2">
                            <label htmlFor="producto" className="text-sm uppercase font-bold">Producto</label>
                            <input
                                id="producto"
                                className="w-full p-3 border border-gray-100"
                                type="text"
                                {...register("producto")}
                            />
                            {errors.producto && <p className="text-red-500">{errors.producto.message}</p>}
                        </div>

                        <div className="mb-2">
                            <label htmlFor="precio" className="text-sm uppercase font-bold">Precio</label>
                            <input
                                id="precio"
                                className="w-full p-3 border border-gray-100"
                                type="number"
                                {...register("precio")}
                            />
                            {errors.precio && <p className="text-red-500">{errors.precio.message}</p>}
                        </div>

                        <div className='mb-2'>
                            <label htmlFor="categoria" className="text-sm uppercase font-bold">Categoria</label>
                            <select
                                id="categoria"
                                className="w-full p-3 border border-gray-100"
                                defaultValue={selectedCategoria}
                                onChange={handleSelectChange}
                                {...register("categoria")}
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
                                {...register("descripcion")}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="stock" className="text-sm uppercase font-bold">Stock Actual</label>
                            <input
                                id="stock"
                                className="w-full p-3 border border-gray-100"
                                type="number"
                                {...register("stock")}
                            />
                            {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
                        </div>

                        <div className="mb-2">
                            <label htmlFor="stock_Min" className="text-sm uppercase font-bold">Stock mínimo</label>
                            <input
                                id="stock_Min"
                                type="number"
                                className="w-full p-3 border border-gray-100"
                                {...register("stock_Min")}
                            />
                        </div>
                        <div className='flex gap-1'>
                            <button
                                type="submit"
                                className="btn-modificar"
                            >
                                <i className="animation"></i>Editar producto<i className="animation"></i>
                            </button>

                            <button
                                onClick={() => handleDelete()}
                                className="btn-borrar">
                                <i className="animation"></i>Borrar<i className="animation"></i>
                            </button>


                        </div>

                        <button
                            onClick={() => closeModal()}
                            className="btn-cerrar">
                            <i className="animation"></i>Cerrar<i className="animation"></i>
                        </button>
                    </form>
                </div>
            </div>




        </div>
    );
}

export default DetalleProducto;
