import React, { useState } from 'react';
import {
    Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions,Alert,
   
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";

import { AddOneInfo } from "../../../services/remote/post/AddInfoAdi";

const AddInfoAddi = ({ open, onClose, selectedData, IdProductSelect }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [loading, setLoading] = useState(false);

    // Función para generar detail_row
    const getDetailRow = (activo = "S", borrado = "N", usuarioReg = "SYSTEM") => ({
        Activo: activo,
        Borrado: borrado,
        detail_row_reg: [{ FechaReg: Date.now(), UsuarioReg: usuarioReg }],
    });

    const formik = useFormik({
        initialValues: {
            IdEtiquetaOK: selectedData?.IdEtiquetaOK || "",
            IdEtiqueta: selectedData?.IdEtiqueta || "",
            Valor: selectedData?.Valor || "",
            IdTipoSeccionOK: selectedData?.IdTipoSeccionOK || "",
            Secuencia: selectedData?.Secuencia ? Number(selectedData.Secuencia) : "",
            detail_row: selectedData?.detail_row || getDetailRow(),
        },
     
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert("");
            setMensajeExitoAlert("");
            
            // Formatear los datos antes de enviarlos
            const formattedData = {
                IdEtiquetaOK: values.IdEtiquetaOK.trim(),  // Eliminar espacios extra
                IdEtiqueta: values.IdEtiqueta.trim(),      // Eliminar espacios extra
                Valor: values.Valor.trim(),                 // Eliminar espacios extra
                IdTipoSeccionOK: values.IdTipoSeccionOK, //el primero estaba en minúsculas
                Secuencia: values.Secuencia,                // Dejarlo como número
            };

            console.log(formattedData);
            try {
                // Llamar a la API usando la función AddOneInfo
                const result = await AddOneInfo(IdProductSelect, formattedData);

                // Mostrar mensaje de éxito si la API responde correctamente
                setMensajeExitoAlert("InfoAdd guardada correctamente.");
                console.log("Resultado de la API:", result);
            } catch (e) {
                console.error("Error al guardar la Informacion:", e);
                if (e.response) {
                    console.error("Detalles del error:", e.response.data);  // Verifica la respuesta del servidor
                }
                setMensajeErrorAlert("No se pudo guardar la Informacion.");
            }
            setLoading(false);
        },
    });

    const handleSecuenciaChange = (event) => {
        const value = event.target.value;
        // Convierte el valor a número si es posible
        const numberValue = value ? Number(value) : '';  // Convertir el valor de Secuencia a número
        formik.setFieldValue('Secuencia', numberValue);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography variant="h6">Agregar Info Adicional</Typography>
                </DialogTitle>
                <DialogContent>
              
                    <TextField
                        id="IdEtiquetaOK"
                        label="Id EtiquetaOK"
                        name="IdEtiquetaOK"
                        value={formik.values.IdEtiquetaOK}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        id="IdEtiqueta"
                        label="Id Etiqueta"
                        name="IdEtiqueta"
                        value={formik.values.IdEtiqueta}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        id="Valor"
                        label="Valor"
                        name="Valor"
                        value={formik.values.Valor}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        id="IdTipoSeccionOK"
                        label="IdTipoSeccionOK"
                        name="IdTipoSeccionOK"
                        value={formik.values.IdTipoSeccionOK}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        id="Secuencia"
                        label="Secuencia"
                        name="Secuencia"
                        value={formik.values.Secuencia || ""}
                        onChange={handleSecuenciaChange}  // Asegurarse de que Secuencia sea un número
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        type="number"  // Establecer tipo numérico
                    />
                </DialogContent>
                <DialogActions>
                    {mensajeErrorAlert && <Alert severity="error">{mensajeErrorAlert}</Alert>}
                    {mensajeExitoAlert && <Alert severity="success">{mensajeExitoAlert}</Alert>}
                    <LoadingButton
                        color="secondary"
                        variant="outlined"
                        onClick={onClose}
                        startIcon={<CloseIcon />}
                    >
                        Cerrar
                    </LoadingButton>
                    <LoadingButton
                        color="primary"
                        variant="contained"
                        type="submit"
                        startIcon={<SaveIcon />}
                        loading={loading}
                    >
                        Guardar
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddInfoAddi;
