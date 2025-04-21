import {getDetailRow} from "../helpers/utils"

export function NegocioModel(){
    let Negocio = {
        IdNegocioOK: { type: String },
        detail_row: getDetailRow(),
    };
    return Negocio;
};