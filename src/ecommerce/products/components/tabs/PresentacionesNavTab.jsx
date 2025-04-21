import { Box, Tabs, Tab } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material"; // Importa estos componentes

// Definimos los nombres de las tabs
const presentacionesTabs = ["Presentaciones", "Info ad", "Paquetes", "Archivos"];

const PresentacionesNavTab = ({ currentRowInPresentacionesTab, setCurrentNameTabInPresentacionesTab, datosSeleccionados,selectedId }) => {

    const [currenTabIndex, setCurrentTabIndex] = useState(0);

    const [alertOpen, setAlertOpen] = useState(false); // Controla la visibilidad
    const [alertMessage, setAlertMessage] = useState(""); // Mensaje personalizado

    const showAlert = (message) => {
        setAlertMessage(message);
        setAlertOpen(true);
    };

    // Verificamos si datosSeleccionados está definido antes de usarlo
    useEffect(() => {
        console.log("datosSeleccionados disponible", datosSeleccionados);
        if (!datosSeleccionados) {
            console.log("datosSeleccionados no está disponible aún.");
            return;
        }
        console.log("datosSeleccionados disponible", datosSeleccionados);
    }, [datosSeleccionados]);

    const handleChange = (e) => {
        const tabName = e.target.innerText.toUpperCase();

        if (!selectedId && (tabName === "INFO AD" || tabName === "PAQUETES" || tabName === "ARCHIVOS")) {
        showAlert("Debes seleccionar una fila antes de acceder a esta sección.");
        return;
        }
        setCurrentNameTabInPresentacionesTab(tabName);

        switch (tabName) {
            case "PRESENTACIONES":
                setCurrentTabIndex(0);
                break;
            /*   case "ESTATUS":
                   setCurrentTabIndex(1);
                   break;*/
            case "INFO AD":
                setCurrentTabIndex(1);
                break;
            case "PAQUETES":
                setCurrentTabIndex(2);
                break;
            case "ARCHIVOS":
                setCurrentTabIndex(3);
                break;
        }
    };

    return (
        <Box sx={{ border: (theme) => `2px solid ${theme.palette.divider}`, mx: 1, padding: 0.5 }}>
            <Tabs
                value={currenTabIndex}
                variant={"fullWidth"}
                onChange={handleChange}
                aria-label="icon tabs example"
                textColor="primary"
            >
                {presentacionesTabs.map((tab) => {
                    return <Tab key={tab} label={tab} disabled={currentRowInPresentacionesTab === null} />;
                })}
            </Tabs>
             <Snackbar
                open={alertOpen}
                autoHideDuration={3000} // Duración en milisegundos
                onClose={() => setAlertOpen(false)} // Cierra la alerta después de la duración
            >
            <Alert severity="warning" onClose={() => setAlertOpen(false)}>
                {alertMessage}
            </Alert>
            </Snackbar>

        </Box>
    );
};

export default PresentacionesNavTab;
