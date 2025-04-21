import axios from "axios";

export function DetallesEstatus(productId, EstatusData) {
  return new Promise((resolve, reject) => {
    // Registro del objeto EstatusData para depuración
    // Cambia la URL para usar el productId dinámicamente
    const url = `${import.meta.env.VITE_REST_API_PRODUCT_PUT}/${productId}/estatus/${EstatusData.IdTipoEstatusOK}`;
    // Realizamos la solicitud patch usando axios
    axios.patch(url, EstatusData)
      .then((response) => {
        const data = response.data;

        // Verificamos si la respuesta contiene los datos esperados
        if (!data) {
          console.error("No se pudo realizar correctamente la petición DetallesEstatus():", data);
          reject("No se recibieron datos de respuesta.");
        } else {
          console.log("Estatus actualizado exitosamente:", data);
          resolve(data);  // Resolvemos la promesa con los datos de la respuesta
        }
      })
      .catch((error) => {
        // Manejo detallado de errores
        if (error.response) {
          console.error("Detalles del error en DetallesEstatus():", error.response.data);
          console.error("Código de estado:", error.response.status);
        } else {
          console.error("Error en DetallesEstatus():", error.message);
        }
        reject(error);  // Rechazamos la promesa si hay un error
      });
  });
}