export const useCrearProducto = () => {
    const crearProductoReal = async (producto) => {
        console.log(producto + " viendo el producto")
        try {
            const response = await fetch('http://localhost:8092/api/v1/producto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto),
            });

            if (!response.ok) {
                throw new Error('Error al crear el producto');
            }

            const data = await response.json();
            console.log('Producto creado:', data);
            return data; // Podrías devolver los datos para manejar más adelante
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return {crearProductoReal};
};