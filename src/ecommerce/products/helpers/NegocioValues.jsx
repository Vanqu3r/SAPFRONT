import { NegocioModel } from "../models/NegocioModel";

export const NegocioValues = (values) =>{
    let Negocio = NegocioModel();

    Negocio.IdNegocioOK=values.IdNegocioOK;

    return Negocio;
}