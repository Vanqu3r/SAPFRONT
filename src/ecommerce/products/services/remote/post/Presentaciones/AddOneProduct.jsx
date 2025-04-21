import axios from "axios";

export function AddOneProduct(id, product) {

  console.log("<<EJECUTA>> API <<AddOneProduct>> Requiere:", product)
  return new Promise((resolve, reject) => {

    axios.post(import.meta.env.VITE_API_PRODUCTOS_URL + "/presentacion/" + id, product)
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


export function addOneInfo(id, presentationId, product) {

  console.log("<<EJECUTA>> API <<AddOneProduct>> Requiere:", product)
  return new Promise((resolve, reject) => {
    axios.post(import.meta.env.VITE_API_PRODUCTOS_URL + "/presentacion/" + id + "/info/" + presentationId, product)
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


export function addOneArchivo(id, presentationId, product) {

  console.log("<<EJECUTA>> API <<AddOneProduct>> Requiere:", product)
  return new Promise((resolve, reject) => {

    axios.post(import.meta.env.VITE_API_PRODUCTOS_URL + "/presentacion/" + id + "/archivos/" + presentationId, product)
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

export function addOnePaquete(id, presentationId, product) {
  console.log("<<EJECUTA>> API <<AddOneProduct>> Requiere:", product)
  return new Promise((resolve, reject) => {

    axios.post(import.meta.env.VITE_API_PRODUCTOS_URL + "/paquete/" + id + "/presentacion/" + presentationId, product)
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