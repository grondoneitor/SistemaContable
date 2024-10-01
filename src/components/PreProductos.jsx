import { Link } from 'react-router-dom'
export default function PreProductos() {
  
    return (
     <main >
             <h1 className="text-center my-24 text-5xl text-slate-800 font-semibold "  >Que te gustaria hacer?</h1>

             <ul className='flex justify-around mt-44' >
             <li><Link to="/productos">
                {
                    <h3 className=' text-3xl text-slate-700 font-black '>Productos</h3>
                }
                </Link>
                </li>                
                <li><Link to="/categorias">
                {
                    <h3 className=' text-3xl text-slate-700 font-black' >Categorias</h3>
                }
                </Link>
                </li>
             </ul>
     

     </main>
         

    
   
)
}
