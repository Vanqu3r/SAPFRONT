import { Box } from "@mui/material";
// import OrdersTable from "../tables/OrdersTable.jsx";

import PresentacionesTable from "../../tables/Presentacion/PresentacionesInfo";

export default function PresentacionesInfoAd({ datosSeleccionados, setDatosSeleccionados,selectedId }) {
    return (
        <Box>
            {/* <h1>Negocios</h1> */}
            <PresentacionesTable
                datosSeleccionados={datosSeleccionados}
                setDatosSeleccionados={setDatosSeleccionados}
                selectedId={selectedId}
            />
        </Box>
    );
}