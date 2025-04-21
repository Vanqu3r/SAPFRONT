// services/remote/delete/DeleteProduct.jsx
import axios from 'axios';

// Usar la variable de entorno para la URL base
const API_URL = import.meta.env.VITE_API_PRODUCTOS_URL;

export const DeleteProduct = async (productId) => {
    try {
        // Realiza la solicitud DELETE utilizando la URL base de la variable de entorno
        const response = await axios.delete(`${API_URL}/hard/${productId}`);
        
        // Si la eliminación es exitosa, puedes retornar la respuesta
        return response.data;
    } catch (error) {
        // En caso de error, lanza el error para ser manejado en el modal
        throw error;
    }
};
