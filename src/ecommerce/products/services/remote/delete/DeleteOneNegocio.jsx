import axios from "axios";

export function DeleteOneNegocio(idProd,negocio){
    console.log("<<EJECUTA>> API <<DeleteOneNegocio>> Requiere:"+idProd+",", negocio)
    return new Promise((resolve, reject) => {
      //RUTA PARA PATCH DELETE: /negocios/delete/:id/:idNegocio
      axios.patch(import.meta.env.VITE_API_PRODUCTOS_URL+'/negocios/delete/'+idProd+"/"+negocio)
        .then((response) => {
          console.log("<<RESPONSE>> DeleteOneNegocio", negocio)
          const data = response.data;
          console.log("<<RESPONSE>> DATA:", data);
          if (!data) {  
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<DeleteOneNegocio>> de forma correcta", data);
            reject(data); 
          } else if (data) {
            resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<DeleteOneNegocio>>", error);
          reject(error); 
        });     
    });
}