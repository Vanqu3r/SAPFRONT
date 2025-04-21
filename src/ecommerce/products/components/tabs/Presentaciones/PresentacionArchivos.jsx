import { Box } from "@mui/material";

import PresentacionesTable from "../../tables/Presentacion/PresentacionesArchivos";

export default function PresentacionArchivos({ datosSeleccionados, setDatosSeleccionados,selectedId }) {
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