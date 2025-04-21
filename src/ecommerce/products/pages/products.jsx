import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import ProductsNavTab from "../components/tabs/ProductsNavTab"
import ProductTab from "../components/tabs/ProductTab"
import NegociosTab from "../components/tabs/NegociosTab"
import Presentaciones from "../components/tabs/Presentaciones"
import InfoAdTab from "../components/tabs/InfoAdTab"
import EstatusTab from "../components/tabs/EstatusTab"

export default function Products() {

    
    const [currentRowInProductsTab, setCurrentRowInProductsTab] = useState(null);
    const [currentNameTabInPrincipalTab, setCurrentNameTabInPrincipalTab] = useState("PRODUCTOS");
    const [datosSeleccionados, setDatosSeleccionados] = useState({
        IdProdServOK: "0"
    });

    

    
    const [isSelected, setIsSelected] = useState(false);

    
    useEffect(() => {
        console.log(datosSeleccionados);
        if (datosSeleccionados.IdProdServOK === "0") {
            console.log('Desactivar TABs');
            setIsSelected(true);
        } else {
            console.log('ACTIVAR Tabs');
            setIsSelected(false);
        }
    }, [datosSeleccionados]);



    return (
        <Box>
            <ProductsNavTab
                setCurrentRowInProductsTab={setCurrentRowInProductsTab}
                setCurrentNameTabInPrincipalTab={setCurrentNameTabInPrincipalTab}
                isSelected={isSelected}
            />

            {currentNameTabInPrincipalTab == "PRODUCTOS" &&
                <ProductTab
                    datosSeleccionados={datosSeleccionados}
                    setDatosSeleccionados={setDatosSeleccionados}
                />
            }
            {currentNameTabInPrincipalTab == "ESTATUS" &&
                <EstatusTab
                    datosSeleccionados={datosSeleccionados}
                    setDatosSeleccionados={setDatosSeleccionados}
                />
            }
            {currentNameTabInPrincipalTab == "PRESENTACIONES" &&
                <Presentaciones
                    datosSeleccionados={datosSeleccionados}
                    setDatosSeleccionados={setDatosSeleccionados}
                />
            }
            {currentNameTabInPrincipalTab == "NEGOCIOS" &&
                <NegociosTab
                    datosSeleccionados={datosSeleccionados}
                    setDatosSeleccionados={setDatosSeleccionados}
                />
            }
            {currentNameTabInPrincipalTab == "INFORMACION ADICIONAL" &&
                <InfoAdTab
                 datosSeleccionados={datosSeleccionados}
                 setDatosSeleccionados={setDatosSeleccionados}
                />
            }
        </Box>
    );
}