import {getDetailRow} from "../helpers/utils"

export function EstatusModel(){
    let Estatus = {
        IdTipoEstatusOK: { type: String },
        Actual: { type: String },
        Observacion: { type: String },
        detail_row: {
            Activo: {type: String, default: 'S'},
            Borrado: {type: String, default: 'N'},
            detail_row: getDetailRow(),
        },
    };
    return Estatus;
};