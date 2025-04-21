import {Box} from "@mui/material";
import NegociosTable from "../tables/NegociosTable";

export default function NegociosTab({datosSeleccionados, setDatosSeleccionados}) {
    return (
        <Box>
            <NegociosTable
                datosSeleccionados={datosSeleccionados}
                setDatosSeleccionados={setDatosSeleccionados}
            />
        </Box>
    );
}