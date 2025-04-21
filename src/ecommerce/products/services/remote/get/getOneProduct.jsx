import axios from "axios";

export function getProduct(id) {
    return new Promise((resolve, reject) => {
      axios.get(import.meta.env.VITE_API_PRODUCTOS_URL+"/producto/"+id)
        .then((response) => {
          const data = response.data;
  
          if (!data) {
            console.error("No se pudo realizar correctamente la petición getProduct():", data);
            reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
          } else if (data.length === 0) {
            console.info("🛈 No se encontraron elementos para getProduct():");
            resolve([]); 
          } else {
            const producto = data;
            console.log("PRODUCTOS", producto);
            resolve(JSON.parse(JSON.stringify(producto))); // Resuelve la promesa y hace una copia profunda
          }
        })
        .catch((error) => {
          console.error("Error en getProduct():", error);
          reject(error); // Rechaza la promesa en caso de error
        });
    });
  }