import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert,
    IconButton, InputAdornment,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as genID } from "uuid";
import JsBarcode from 'jsbarcode';
import { putArchivo } from "../../../services/remote/put/presentaciones/putpresentaciones"; // Revisa si esta ruta es correcta

const achivoPutPresntacion = ({ open, onClose, selectedRowData, IdProductSelect, selectedId, idChin }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [loading, setLoading] = useState(false);
    console.log(IdProductSelect, selectedId)
    // Función para generar detail_row
    const getDetailRow = (activo = "S", borrado = "N", usuarioReg = "SYSTEM") => ({
        Activo: activo,
        Borrado: borrado,
        detail_row_reg: [{ FechaReg: Date.now(), UsuarioReg: usuarioReg }],
    });

    const formik = useFormik({
        initialValues: {
            DesArchivo: selectedRowData?.DesArchivo || "",
            IdArchivoBK: selectedRowData?.IdArchivoBK || "",
            IdArchivoOK: selectedRowData?.IdArchivoOK || "",
            IdTipoArchivoOK: selectedRowData?.IdTipoArchivoOK || "",
            IdTipoSeccionOK: selectedRowData?.IdTipoSeccionOK || "",
            Path: selectedRowData?.Path || "",
            Principal: selectedRowData?.Principal || "",
            RutaArchivo: selectedRowData?.RutaArchivo || "",
            Secuencia: selectedRowData?.Secuencia || "",
            detail_row: selectedRowData?.detail_row || getDetailRow(),
        },
        validationSchema: Yup.object({
            DesArchivo: Yup.string().required("Descripción del Archivo es requerida"),
            IdArchivoBK: Yup.string().required("Id Archivo BK es requerido"),
            //IdArchivoOK: Yup.string().required("Id Archivo OK es requerido"),
            IdTipoArchivoOK: Yup.string().required("Tipo de Archivo es requerido"),
            IdTipoSeccionOK: Yup.string().required("Tipo de Sección es requerido"),
            Path: Yup.string().required("Ruta del Archivo es requerida"),
            RutaArchivo: Yup.string().required("URL del Archivo es requerida"),
            Secuencia: Yup.number().required("Secuencia es requerida").typeError("Debe ser un número"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert("");
            setMensajeExitoAlert("");
            try {
                // Llamar a la API usando la función AddOneArchivo
                const result = await putArchivo(IdProductSelect, selectedId, idChin, {
                    ...values,
                    IdArchivoOK: idChin,
                });

                // Mostrar mensaje de éxito si la API responde correctamente
                setMensajeExitoAlert("Información guardada correctamente.");
                console.log("Resultado de la API:", result);
            } catch (e) {
                console.error("Error al guardar la presentación:", e);
                setMensajeErrorAlert("No se pudo guardar la presentación.");
            }
            setLoading(false);
        },
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography variant="h6">Editar Archivo</Typography>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="IdArchivoBK"
                        label="Id Archivo BK"
                        disabled
                        value={formik.values.IdArchivoBK}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.IdArchivoBK && Boolean(formik.errors.IdArchivoBK)}
                        helperText={formik.touched.IdArchivoBK && formik.errors.IdArchivoBK}
                    />
                    <TextField
                        id="IdArchivoOK"
                        label="Id Archivo OK"
                        value={idChin}
                        disabled
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.IdArchivoOK && Boolean(formik.errors.IdArchivoOK)}
                        helperText={formik.touched.IdArchivoOK && formik.errors.IdArchivoOK}
                    />
                    <TextField
                        id="IdTipoArchivoOK"
                        label="Tipo de Archivo"
                        value={formik.values.IdTipoArchivoOK}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.IdTipoArchivoOK && Boolean(formik.errors.IdTipoArchivoOK)}
                        helperText={formik.touched.IdTipoArchivoOK && formik.errors.IdTipoArchivoOK}
                    />
                    <TextField
                        id="IdTipoSeccionOK"
                        label="Tipo de Sección"
                        value={formik.values.IdTipoSeccionOK}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.IdTipoSeccionOK && Boolean(formik.errors.IdTipoSeccionOK)}
                        helperText={formik.touched.IdTipoSeccionOK && formik.errors.IdTipoSeccionOK}
                    />
                    <TextField
                        id="DesArchivo"
                        label="Descripción del Archivo"
                        value={formik.values.DesArchivo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.DesArchivo && Boolean(formik.errors.DesArchivo)}
                        helperText={formik.touched.DesArchivo && formik.errors.DesArchivo}
                    />
                    <TextField
                        id="Principal"
                        label="Principal"
                        value={formik.values.Principal}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.Principal && Boolean(formik.errors.Principal)}
                        helperText={formik.touched.Principal && formik.errors.Principal}
                    />
                    <TextField
                        id="RutaArchivo"
                        label="URL del Archivo"
                        value={formik.values.RutaArchivo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.RutaArchivo && Boolean(formik.errors.RutaArchivo)}
                        helperText={formik.touched.RutaArchivo && formik.errors.RutaArchivo}
                    />
                    <TextField
                        id="Secuencia"
                        label="Secuencia"
                        value={formik.values.Secuencia}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.Secuencia && Boolean(formik.errors.Secuencia)}
                        helperText={formik.touched.Secuencia && formik.errors.Secuencia}
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

export default achivoPutPresntacion;
