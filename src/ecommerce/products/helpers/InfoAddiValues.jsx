import { InfoAddiModel } from "../models/InfoAddiModel";
export const InfoAddiValues = (values) =>{
    let InfoAddi = InfoAddiModel();
    InfoAddi.IdEtiquetaOK=values.IdEtiquetaOK;
    InfoAddi.IdEtiqueta=values.IdEtiqueta;
    InfoAddi.Valor=values.Valor;
    InfoAddi.IdTipoSeccionOK=values.IdTipoSeccionOK;
    InfoAddi.Secuencia=values.Secuencia;

    return InfoAddi;
}