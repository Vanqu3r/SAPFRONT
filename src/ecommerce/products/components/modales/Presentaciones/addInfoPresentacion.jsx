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
import { addOneInfo } from "../../../services/remote/post/Presentaciones/AddOneProduct";

const AddInfoPresentacion = ({ open, onClose, selectedData, IdProductSelect, IdPresentaSelect }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [loading, setLoading] = useState(false);

    console.log(IdProductSelect + "Producto M");

    // Función para generar detail_row
    const getDetailRow = (activo = "S", borrado = "N", usuarioReg = "SYSTEM") => ({
        Activo: activo,
        Borrado: borrado,
        detail_row_reg: [{ FechaReg: Date.now(), UsuarioReg: usuarioReg }],
    });

    const formik = useFormik({
        initialValues: {
            IdEtiqueta: selectedData?.IdEtiqueta || genID().substring(0,10),
            IdEtiquetaOK: selectedData?.IdEtiquetaOK || genID().substring(0,10),
            IdTipoSeccionOK: selectedData?.IdTipoSeccionOK || genID().substring(0,10),
            Secuencia: selectedData?.Secuencia || "",
            Valor: selectedData?.Valor || "",
            detail_row: selectedData?.detail_row || getDetailRow(),
        },
        validationSchema: Yup.object({

            IdEtiqueta: Yup.string().required("IdEtiqueta es requerido"),
            IdTipoSeccionOK: Yup.string().required("IdTipoSeccionOK es requerido"),
            Secuencia: Yup.number()
                .required("Secuencia es requerida")
                .typeError("Debe ser un número"),
            Valor: Yup.string().required("Valor es requerido"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert("");
            setMensajeExitoAlert("");
            try {
                // Llamar a la API usando la función AddOneProduct
                const result = await addOneInfo(IdProductSelect, IdPresentaSelect, {
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
                    <Typography variant="h6">Agregar Información</Typography>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="IdEtiquetaOK"
                        label="IdEtiquetaOK"
                        value={formik.values.IdEtiquetaOK}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.Etiqueta && Boolean(formik.errors.Etiqueta)}
                        helperText={formik.touched.Etiqueta && formik.errors.Etiqueta}
                    />
                    <TextField
                        id="IdEtiqueta"
                        label="Etiqueta"
                        value={formik.values.IdEtiqueta}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.IdEtiqueta && Boolean(formik.errors.IdEtiqueta)}
                        helperText={formik.touched.IdEtiqueta && formik.errors.IdEtiqueta}
                    />
                    <TextField
                        id="IdTipoSeccionOK"
                        label="IdTipoSeccionOK"
                        value={formik.values.IdTipoSeccionOK}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.IdTipoSeccionOK && Boolean(formik.errors.IdTipoSeccionOK)}
                        helperText={formik.touched.IdTipoSeccionOK && formik.errors.IdTipoSeccionOK}
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
                    <TextField
                        id="Valor"
                        label="Valor"
                        value={formik.values.Valor}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.Valor && Boolean(formik.errors.Valor)}
                        helperText={formik.touched.Valor && formik.errors.Valor}
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

export default AddInfoPresentacion;
