import axios from "axios";

export function AddOneInfo(id,data) {
  return axios
    .post(import.meta.env.VITE_API_PRODUCTOS_URL + "/producto/"+id+"/info_ad", data)
    .then((response) => {
      console.log("<<RESPONSE>> AddOneProduct", response);
      if (!response.data) {
        console.error("<<ERROR>> La API no retornó datos", response);
        throw new Error("No se obtuvo respuesta de la API.");
      }
      return response.data;  // Regresamos la respuesta directamente
    })
    .catch((error) => {
      console.error("<<ERROR>> en API <<AddOneProduct>>", error);
      throw error;  // Re-lanzamos el error para que sea manejado en el catch de la llamada original
    });
}
