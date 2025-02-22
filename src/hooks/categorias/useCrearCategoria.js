
export const useCrearCategoria = () => {
    const crearCategoriaReal = async (categoria) => {
        console.log(categoria.categoria)
        const token = localStorage.getItem("tokenLogin")
        try {
            const response = await fetch('http://localhost:8092/api/v1/categoria', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,    
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"categoria": categoria}),
            });



            const data = await response;

            if (!response.ok) {
                throw data
            }
            console.log('Categoria creado:', data);
            return data; // Podrías devolver los datos para manejar más adelante
        } catch (error) {
            console.error( error);
        }
    };

    return {crearCategoriaReal};
};