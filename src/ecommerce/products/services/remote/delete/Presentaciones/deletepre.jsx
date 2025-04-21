import axios from "axios";

export function deleteProduct(productId, preID) {
    return new Promise((resolve, reject) => {
        axios
            .delete(import.meta.env.VITE_API_PRODUCTOS_URL + "/presentacion/" + productId + "/" + preID)
            .then((response) => {
                const data = response.data;

                if (!data) {
                    console.error("No se pudo realizar correctamente la petición <<deleteProduct - Services>>", data);
                    reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
                } else {
                    console.log(`Producto con ID: ${productId} eliminado correctamente.`);
                    resolve(data); // Resuelve la promesa con la respuesta del servidor
                }
            })
            .catch((error) => {
                console.error("Error en <<deleteProduct - Services>>", error);
                reject(error); // Rechaza la promesa en caso de error
            });
    });
}

export function deleteInfo(productId, preID, otraid) {
    return new Promise((resolve, reject) => {
        axios
            .delete(import.meta.env.VITE_API_PRODUCTOS_URL + "/presentacion/" + productId + "/info/" + preID + "/" + otraid)
            .then((response) => {
                const data = response.data;

                if (!data) {
                    console.error("No se pudo realizar correctamente la petición <<deleteProduct - Services>>", data);
                    reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
                } else {
                    console.log(`Producto con ID: ${productId} eliminado correctamente.`);
                    resolve(data); // Resuelve la promesa con la respuesta del servidor
                }
            })
            .catch((error) => {
                console.error("Error en <<deleteProduct - Services>>", error);
                reject(error); // Rechaza la promesa en caso de error
            });
    });
}

export function deleteArchivo(productId, preID, otraid) {
    return new Promise((resolve, reject) => {
        axios

            .delete(import.meta.env.VITE_API_PRODUCTOS_URL + "/presentacion/" + productId + "/archivos/" + preID + "/" + otraid)
            .then((response) => {
                const data = response.data;

                if (!data) {
                    console.error("No se pudo realizar correctamente la petición <<deleteProduct - Services>>", data);
                    reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
                } else {
                    console.log(`Producto con ID: ${productId} eliminado correctamente.`);
                    resolve(data); // Resuelve la promesa con la respuesta del servidor
                }
            })
            .catch((error) => {
                console.error("Error en <<deleteProduct - Services>>", error);
                reject(error); // Rechaza la promesa en caso de error
            });
    });
}


export function deletePaquete(productId, preID, otraid) {
    return new Promise((resolve, reject) => {
        axios

            .delete(import.meta.env.VITE_API_PRODUCTOS_URL + "/paquete/" + productId + "/presentacion/" + preID + "/" + otraid)
            .then((response) => {
                const data = response.data;

                if (!data) {
                    console.error("No se pudo realizar correctamente la petición <<deleteProduct - Services>>", data);
                    reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
                } else {
                    console.log(`Producto con ID: ${productId} eliminado correctamente.`);
                    resolve(data); // Resuelve la promesa con la respuesta del servidor
                }
            })
            .catch((error) => {
                console.error("Error en <<deleteProduct - Services>>", error);
                reject(error); // Rechaza la promesa en caso de error
            });
    });
}
