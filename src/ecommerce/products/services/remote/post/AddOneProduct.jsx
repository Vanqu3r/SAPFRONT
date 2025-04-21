import axios from "axios";

export function AddOneProduct(product){

    console.log("<<EJECUTA>> API <<AddOneProduct>> Requiere:", product)
    return new Promise((resolve, reject) => {

      axios.post(import.meta.env.VITE_API_PRODUCTOS_URL, product)
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