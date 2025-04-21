import axios from 'axios';

export async function DeleteInfoAdi(id, idEti) {
  try {
    // Formamos la URL de la solicitud DELETE
    //router.delete('/producto/:id/info_ad/:idEti', prodServController.deleteInfoAdi);
    console.log(idEti);
    const url = `${import.meta.env.VITE_API_PRODUCTOS_URL}/producto/${id}/info_ad/${idEti}`;
    console.log("URL de eliminación: ", idEti);

    // Realizamos la solicitud DELETE
    const response = await axios.delete(url);

    // Si la respuesta es exitosa
    if (response.status === 200) {
      console.log("Elemento eliminado con éxito:", response.data);
      return response.data; // Resolvemos con la respuesta
    } else {
      throw new Error("Error al eliminar la información adicional.");
    }
  } catch (error) {
    // Manejo de errores
    if (error.response) {
      console.error("Detalles del error:", error.response.data);
      console.error("Código de estado:", error.response.status);
    } else {
      console.error("Error en DeleteInfoAdi():", error.message);
    }
    throw error; // Rechazamos la promesa en caso de error
  }
}
