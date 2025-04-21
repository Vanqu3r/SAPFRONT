import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert,
    IconButton, InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as genID } from "uuid";
import { addOnePaquete } from "../../../services/remote/post/Presentaciones/AddOneProduct";

const AddPaquete = ({ open, onClose, selectedRowData, IdProductSelect, selectedId }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            IdPresentaOK: selectedRowData?.IdPresentaOK || genID().substring(5,15),
            DesPresenta: selectedRowData?.DesPresenta || "",
            Cantidad: selectedRowData?.Cantidad || "",
            Activo: selectedRowData?.detail_row?.Activo || "S",
            Borrado: selectedRowData?.detail_row?.Borrado || "N",
        },
        validationSchema: Yup.object({
            IdPresentaOK: Yup.string().required("ID de Presentación es requerido"),
            DesPresenta: Yup.string().required("Descripción es requerida"),
            Cantidad: Yup.number().required("Cantidad es requerida").typeError("Debe ser un número"),
            Activo: Yup.string().required("Estado Activo es requerido"),
            Borrado: Yup.string().required("Estado Eliminado es requerido"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert("");
            setMensajeExitoAlert("");
            try {
                // Llamar a la API usando la función addOnePresentacion
                const result = await addOnePaquete(IdProductSelect, selectedId, {
                    ...values,
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
                    <Typography variant="h6">Agregar Paquete</Typography>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="IdPresentaOK"
                        label="ID de Presentación"
                        value={formik.values.IdPresentaOK}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.IdPresentaOK && Boolean(formik.errors.IdPresentaOK)}
                        helperText={formik.touched.IdPresentaOK && formik.errors.IdPresentaOK}
                    />
                    <TextField
                        id="DesPresenta"
                        label="Descripción"
                        value={formik.values.DesPresenta}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.DesPresenta && Boolean(formik.errors.DesPresenta)}
                        helperText={formik.touched.DesPresenta && formik.errors.DesPresenta}
                    />
                    <TextField
                        id="Cantidad"
                        label="Cantidad"
                        value={formik.values.Cantidad}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.Cantidad && Boolean(formik.errors.Cantidad)}
                        helperText={formik.touched.Cantidad && formik.errors.Cantidad}
                        type="number"
                    />
                    <TextField
                        id="Activo"
                        label="Activo"
                        value={formik.values.Activo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.Activo && Boolean(formik.errors.Activo)}
                        helperText={formik.touched.Activo && formik.errors.Activo}
                    />
                    <TextField
                        id="Borrado"
                        label="Eliminado"
                        value={formik.values.Borrado}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.Borrado && Boolean(formik.errors.Borrado)}
                        helperText={formik.touched.Borrado && formik.errors.Borrado}
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

export default AddPaquete;
