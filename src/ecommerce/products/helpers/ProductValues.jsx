import { ProductModel } from "../models/ProductModel";

export const ProductValues = (values) => {
    let Product = ProductModel();

    Product.IdProdServOK = values.IdProdServOK;
    Product.IdProdServBK = values.IdProdServBK;
    Product.IdPresentaBK = values.IdPresentaBK;
    Product.IdInstitutoOK = values.IdInstitutoOK;
    Product.CodigoBarras = values.CodigoBarras;
    Product.DesProdServ = values.DesProdServ;
    Product.Indice = values.Indice;

    return Product;
}