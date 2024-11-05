import '../buscadorStyle.css'
import { ServiciosSearch } from "../../services/serviciosSearch";
import { useContext, useMemo } from 'react';
import { ProductoContext } from '../../context/productos';

// eslint-disable-next-line react/prop-types
export default function Header() {
    const { handleSubmit, handleVolver } = ServiciosSearch()
    const {state:statePro} = useContext(ProductoContext)
    console.log(statePro.nombreProductoBuscado, statePro.productosBuscados)
    const errors =useMemo(()=> statePro.nombreProductoBuscado !== "" && statePro.productosBuscados.length <= 0 && "No se encontro ese producto" ,[statePro.nombreProductoBuscado, statePro.productosBuscados])
    return (
        <header className='w-full'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center mt-9'>

                <div className='flex items-center  justify-center gap-4'>
                    <button
                    onClick={handleVolver}
                    className="button">
                        <div className="button-box">
                            <span className="button-elem">
                                <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                                    ></path>
                                </svg>
                            </span>
                            <span className="button-elem">
                                <svg viewBox="0 0 46 40">
                                    <path
                                        d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                                    ></path>
                                </svg>
                            </span>
                        </div>
                    </button>
                    <div className="container-input">
                        <input type="text" placeholder="Search" name="producto" className="input" />
                        <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                            <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" ></path>
                        </svg>
                        { errors !== "" && <p>{errors}</p>}
                    </div>

                    {/* <button className='bg-slate-800 text-slate-100 font-bold uppercase p-3 rounded-3xl' type="submit">
                        Buscar productos
                    </button> */}
                </div>
            </form>
        </header>
    );
}
