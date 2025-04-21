import { Box } from "@mui/material";
import PresentacionesTable from "../../tables/Presentacion/PresentacionesTable";

export default function PresentacionesTab({ datosSeleccionados, setDatosSeleccionados,setSelectedId }) {
    return (
        <Box>
            <PresentacionesTable
                datosSeleccionados={datosSeleccionados}
                setDatosSeleccionados={setDatosSeleccionados}
                setSelectedId={setSelectedId}
            />
        </Box>
    );
}
