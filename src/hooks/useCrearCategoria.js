import { useEffect } from "react";

export const useCrearCategoria = () => {
    const crearCategoriaReal = async (categoria) => {
        console.log(categoria.categoria + " viendo el categoria")
        try {
            const response = await fetch('http://localhost:8092/api/v1/categoria', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoria),
            });

            if (!response.ok) {
                throw new Error('Error al crear la categoria');
            }

            const data = await response.json();
            console.log('Categoria creado:', data);
            return data; // Podrías devolver los datos para manejar más adelante
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return {crearCategoriaReal};
};