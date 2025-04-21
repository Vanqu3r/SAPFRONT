import {Box} from "@mui/material";
import ProductsTable from "../tables/ProductsTable";

export default function ProductTab({datosSeleccionados, setDatosSeleccionados}) {
    return (
        <Box>
            <ProductsTable
                 datosSeleccionados={datosSeleccionados}
                 setDatosSeleccionados={setDatosSeleccionados}
            />
        </Box>
    );
}