import { EstatusModel } from "../models/EstatusModel";
export const EstatusValues = (values) =>{
    let Estatus = EstatusModel();
    Estatus.IdTipoEstatusOK=values.IdTipoEstatusOK;
    Estatus.Actual=values.Actual;
    Estatus.Observacion=values.Observacion;
    Estatus.Activo=values.Activo;
    Estatus.Borrado=values.Borrado;
    return Estatus;
}