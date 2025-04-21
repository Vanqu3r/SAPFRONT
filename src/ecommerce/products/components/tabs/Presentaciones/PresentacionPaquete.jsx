import { Box } from "@mui/material";
// import OrdersTable from "../tables/OrdersTable.jsx";
import PresentacionesPaquete from "../../tables/Presentacion/PresentacionesPaquete";

export default function PresentacionPaquete({ datosSeleccionados, setDatosSeleccionados,selectedId }) {
    return (
        <Box>
            {/* <h1>Negocios</h1> */}
            <PresentacionesPaquete
                datosSeleccionados={datosSeleccionados}
                setDatosSeleccionados={setDatosSeleccionados}
                selectedId={selectedId}
            />
        </Box>
    );
}