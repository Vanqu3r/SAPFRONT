import axios from "axios";

export function AddOneProduct(id, idPresentacion, product) {

    console.log("<<EJECUTA>> API <<AddOneProduct>> Requiere:", product)
    return new Promise((resolve, reject) => {

        axios.put(import.meta.env.VITE_API_PRODUCTOS_URL + "/presentacion/" + id + "/" + idPresentacion, product)
            .then((response) => {
                console.log("<<RESPONSE>> AddOneProduct", product)
                const data = response.data;
                //console.log("<<RESPONSE>> DATA:", data);
                if (!data) {
                    console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneProduct>> de forma correcta", data);
                    reject(data);
                } else if (data) {
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("<<ERROR>> en API <<AddOneProduct>>", error);
                reject(error);
            });
    });
}

export function putInfo(id, idPresentacion, infoID, product) {

    console.log("<<EJECUTA>> API <<AddOneProduct>> Requiere:", product)
    return new Promise((resolve, reject) => {

        axios.put(import.meta.env.VITE_API_PRODUCTOS_URL + "/presentacion/" + id + "/info/" + idPresentacion + "/" + infoID, product)
            .then((response) => {
                console.log("<<RESPONSE>> AddOneProduct", product)
                const data = response.data;
                //console.log("<<RESPONSE>> DATA:", data);
                if (!data) {
                    console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneProduct>> de forma correcta", data);
                    reject(data);
                } else if (data) {
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("<<ERROR>> en API <<AddOneProduct>>", error);
                reject(error);
            });
    });
}

export function putArchivo(id, idPresentacion, infoID, product) {

    console.log("<<EJECUTA>> API <<AddOneProduct>> Requiere:", product)
    return new Promise((resolve, reject) => {


        axios.put(import.meta.env.VITE_API_PRODUCTOS_URL + "/presentacion/" + id + "/archivos/" + idPresentacion + "/" + infoID, product)
            .then((response) => {
                console.log("<<RESPONSE>> AddOneProduct", product)
                const data = response.data;
                //console.log("<<RESPONSE>> DATA:", data);
                if (!data) {
                    console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneProduct>> de forma correcta", data);
                    reject(data);
                } else if (data) {
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("<<ERROR>> en API <<AddOneProduct>>", error);
                reject(error);
            });
    });
}

export function putPaquete(id, idPresentacion, infoID, product) {

    console.log("<<EJECUTA>> API <<AddOneProduct>> Requiere:", product)
    return new Promise((resolve, reject) => {
        axios.put(import.meta.env.VITE_API_PRODUCTOS_URL + "/paquete/" + id + "/presentacion/" + idPresentacion + "/" + infoID, product)
            .then((response) => {
                console.log("<<RESPONSE>> AddOneProduct", product)
                const data = response.data;
                //console.log("<<RESPONSE>> DATA:", data);
                if (!data) {
                    console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneProduct>> de forma correcta", data);
                    reject(data);
                } else if (data) {
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("<<ERROR>> en API <<AddOneProduct>>", error);
                reject(error);
            });
    });
}