import axios from "axios";

export function PatchUpdateOneProduct(productId, updateData) {
    console.log("<<EJECUTA>> API <<UpdatePrincipalProduct>> Requiere:", updateData);
    const apiUrl = import.meta.env.VITE_API_PRODUCTOS_URL;  // Accede a la variable de entorno
    return new Promise((resolve, reject) => {
        axios.patch(`${apiUrl}/productosPrincipal/${productId}`, updateData)
            .then((response) => {
                console.log("<<RESPONSE>> UpdatePrincipalProduct", response.data);
                const data = response.data;
                if (!data) {
                    console.error("<<ERROR>> <<NO>> se ejecuto la API <<UpdatePrincipalProduct>> de forma correcta", data);
                    reject(data);
                } else {
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("<<ERROR>> en API <<UpdatePrincipalProduct>>", error);
                reject(error);
            });
    });
}
