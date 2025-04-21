import axios from "axios";

export function AddOneNegocio(idProd,negocio){

    console.log("<<EJECUTA>> API <<AddOneNegocio>> Requiere:", negocio)
    return new Promise((resolve, reject) => {

      axios.patch(import.meta.env.VITE_API_PRODUCTOS_URL+'/negocios/add/'+idProd,negocio)
        .then((response) => {
          console.log("<<RESPONSE>> AddOneNegocio", negocio)
          const data = response.data;
          if (!data) {  
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneNegocio>> de forma correcta", data);
            reject(data); 
          } else if (data) {
            resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<AddOneNegocio>>", error);
          reject(error); 
        });     
    });
}