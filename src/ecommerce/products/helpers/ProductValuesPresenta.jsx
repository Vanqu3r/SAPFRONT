import { ProductModel } from "../models/ProductModel";

export const ProductValues = (values) => {
    let Product = ProductModel();

    Product.IdPresentaOK = values.IdPresentaOK;
    Product.IdPresentaBK = values.IdPresentaBK;
    Product.CodigoBarras = values.CodigoBarras;
    Product.DesPresenta = values.DesPresenta;
    Product.Indice = values.Indice;
    Product.Principal = values.Principal;
    Product.estatus = values.estatus || []; // Asegurarse de que 'estatus' sea un array
    Product.info_vta = values.info_vta || []; // Asegurarse de que 'info_vta' sea un array
    Product.info_ad = values.info_ad || []; // Asegurarse de que 'info_ad' sea un array
    Product.paquete = values.paquete || []; // Asegurarse de que 'paquete' sea un array
    Product.archivos = values.archivos || []; // Asegurarse de que 'archivos' sea un array

    return Product;
};
