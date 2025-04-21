import { getDetailRow } from "../helpers/utils"

export function ProductModel() {
    let Producto = {
        IdPresentaOK: { type: String },
        IdPresentaBK: { type: String },
        CodigoBarras: { type: String },
        DesPresenta: { type: String },
        Indice: { type: String },
        Principal: { type: String },
        estatus: [EstatusSchema],
        info_vta: [{ type: Schema.Types.Mixed }],
        info_ad: [InfoAdSchema],
        paquete: [PaqueteSchema],
        archivos: [ArchivoSchema],
        detail_row: getDetailRow(),
    };
    return Producto;
};