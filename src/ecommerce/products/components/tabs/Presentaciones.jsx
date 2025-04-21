import { Box } from "@mui/material";
import { useState,useEffect } from "react";
//
import PresentacionesNavTab from "./PresentacionesNavTab.jsx";
import PresentacionesTab from "./Presentaciones/PresentacionesTab.jsx";
import PresentacionArchivos from "./Presentaciones/PresentacionArchivos.jsx";
import PresentacionesInfoAd from "./Presentaciones/PresentacionesInfoAd.jsx";
import PresentacionPaquete from "./Presentaciones/PresentacionPaquete.jsx";


export default function Presentaciones({ datosSeleccionados, setDatosSeleccionados }) {

    // indicamos que al iniciar no hay ningun Instituto seleccionado.
    const [currentRowInPresentacionesTab, setcurrentRowInPresentacionesTab] = useState(1);

    // indicamos que el estado inicial del tab page principal por default.
    const [currentNameTabInPresentacionesTab, setCurrentNameTabInPresentacionesTab] = useState("PRESENTACIONES");
    const [selectedId, setSelectedId] = useState(null); // Estado para guardar el ID de la presentación
  
    console.log(datosSeleccionados.IdProdServOK + 'Producto T');
    return (
        <Box>
            <PresentacionesNavTab
                currentRowInPresentacionesTab={currentRowInPresentacionesTab}
                setCurrentNameTabInPresentacionesTab={setCurrentNameTabInPresentacionesTab}
                selectedId={selectedId}
            />

            {currentNameTabInPresentacionesTab == "PRESENTACIONES" && 
                <PresentacionesTab
                    datosSeleccionados={datosSeleccionados}
                    setDatosSeleccionados={setDatosSeleccionados}
                    setSelectedId={setSelectedId}
                />
            }

            {currentNameTabInPresentacionesTab == "INFO AD" && 
                <PresentacionesInfoAd
                    datosSeleccionados={datosSeleccionados}
                    setDatosSeleccionados={setDatosSeleccionados}
                    selectedId={selectedId}
                />
            }
            {currentNameTabInPresentacionesTab == "PAQUETES" && 
                <PresentacionPaquete
                    datosSeleccionados={datosSeleccionados}
                    setDatosSeleccionados={setDatosSeleccionados}
                    selectedId={selectedId}
                />
            }
            {currentNameTabInPresentacionesTab == "ARCHIVOS" && 
                <PresentacionArchivos
                    datosSeleccionados={datosSeleccionados}
                    setDatosSeleccionados={setDatosSeleccionados}
                    selectedId={selectedId}
                />
            }
        </Box>
    );
}