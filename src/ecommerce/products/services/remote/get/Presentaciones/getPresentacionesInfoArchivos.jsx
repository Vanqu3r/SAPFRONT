import axios from "axios";

export function getPresentacionesArchivos(id, idS) {
    return new Promise((resolve, reject) => {

        axios.get(import.meta.env.VITE_API_PRODUCTOS_URL + "/presentacion/" + id + "/archivos/" + idS)


            .then((response) => {
                const data = response.data;

                if (!data) {
                    console.error("No se pudo realizar correctamente la petición getPresentaciones():", data);
                    reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
                } else if (data.length === 0) {
                    console.info("🛈 No se encontraron elementos para getPresentaciones():");
                    resolve([]);
                } else {
                    const presentacion = data;
                    console.log("presentacion", presentacion);
                    resolve(JSON.parse(JSON.stringify(presentacion))); // Resuelve la promesa y hace una copia profunda
                }
            })
            .catch((error) => {
                console.error("Error en getPresentaciones():", error);
                reject(error); // Rechaza la promesa en caso de error
            });
    });
}