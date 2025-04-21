import { getDetailRow } from "../helpers/utils";

export function InfoAddiModel() {

    let InfoAddi = {
        IdEtiquetaOK: {type: String},
        IdEtiqueta: {type: String},
        Valor: {type: String},
        IdTipoSeccionOK: {type: String},
        Secuencia: {type: Number},

        detail_row: getDetailRow(),
    };

    return InfoAddi;

};