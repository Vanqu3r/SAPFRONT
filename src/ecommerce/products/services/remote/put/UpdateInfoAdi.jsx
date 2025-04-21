import axios from "axios";
export function UpdateInfoAdi(id, infoNueva) {
    return new Promise((resolve, reject) => {
        console.log(infoNueva);
        axios.put(`${import.meta.env.VITE_API_PRODUCTOS_URL}/producto/${id}/info_ad`, infoNueva, {
            headers: {
                'Content-Type': 'application/json',  // Cambia a 'application/json'
            }
        })
        .then((response) => {
            const data = response.data;
            console.log("<<RESPONSE>> DATA:", data);
            resolve(data);
        })
        .catch((error) => {
            console.log(infoNueva);
            console.error(infoNueva);
            reject(error);
        });
    });
}


