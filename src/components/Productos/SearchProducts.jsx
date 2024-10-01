
// eslint-disable-next-line react/prop-types
export default function Header({ handleSubmit,handleVolver}) {
     
 

    return (
        <header className='w-full'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center mt-9'>

                <div className='flex items-center w-full justify-center gap-4'>
                    <button onClick={handleVolver} className='flex items-center' type="button">
                        <svg className='text-slate-800 size-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>

                    <div className="w-1/3">
                        <input className='w-full bg-indigo-900 p-3 rounded-3xl text-slate-50'
                            name="producto"
                            type="text"
                            placeholder="Mate, yerbera, bombilla, etc..."
                        />
                        {/* {errorValidacion && <p className="text-red-600 absolute ml-4">{errorValidacion}</p>} */}
                    </div>

                    <button className='bg-slate-800 text-slate-100 font-bold uppercase p-3 rounded-3xl' type="submit">
                        Buscar productos
                    </button>
                </div>
            </form>
        </header>
    );
}
