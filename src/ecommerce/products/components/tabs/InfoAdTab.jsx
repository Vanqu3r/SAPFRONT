import {Box} from "@mui/material";
// import OrdersTable from "../tables/OrdersTable.jsx";
import InfoAddiTable from "../tables/InfoAddiTable";

export default function InfoAdTab({datosSeleccionados, setDatosSeleccionados}) {
    return (
        <Box>
           {/*<h1>Produdddctos</h1>*/}
           <InfoAddiTable
                datosSeleccionados={datosSeleccionados}
                setDatosSeleccionados={setDatosSeleccionados}
            />
        </Box>
    );
}