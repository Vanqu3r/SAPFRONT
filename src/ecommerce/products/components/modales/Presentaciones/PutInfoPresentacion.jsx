import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert,
    IconButton, InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { putInfo } from "../../../services/remote/put/presentaciones/putpresentaciones";


const PutInfoPresentacion = ({ open, onClose, IdPresentaSelect, IdProductSelect, idChin,dataRow }) => {
    // Estados locales
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState(""); // Mensaje de error
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState(""); // Mensaje de éxito
    const [loading, setLoading] = useState(false); // Indicador de carga
    const barcodeRef = useRef(null); // Referencia para el código de barras

    // Genera un objeto predeterminado para el detalle de la fila
    const getDetailRow = (activo = "S", borrado = "N", usuarioReg = "SYSTEM") => ({
        Activo: activo,
        Borrado: borrado,
        detail_row_reg: [{ FechaReg: Date.now(), UsuarioReg: usuarioReg }],
    });

    // Configuración del formulario con Formik
    const formik = useFormik({
        initialValues: {
            IdEtiqueta: dataRow?.IdEtiqueta || "",
            IdEtiquetaOK: dataRow?.IdEtiquetaOK || "",
            IdTipoSeccionOK: dataRow?.IdTipoSeccionOK || "",
            Secuencia: dataRow?.Secuencia || "",
            Valor: dataRow?.Valor || "",
            detail_row: dataRow?.detail_row || getDetailRow(),
        },
        validationSchema: Yup.object({
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
                // Llama a la API para actualizar los datos
                const result = await putInfo(IdProductSelect, IdPresentaSelect, idChin, {
                    ...values,
                    IdEtiquetaOK: idChin,
                });

                setMensajeExitoAlert("Información actualizada correctamente.");
                console.log("Resultado de la API:", result);
            } catch (e) {
                console.error("Error al actualizar la presentación:", e);
                setMensajeErrorAlert("No se pudo actualizar la presentación.");
            }
            setLoading(false);
        },
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography variant="h6">Editar Información</Typography>
                </DialogTitle>
                <DialogContent>
                    {/* Campo: ID */}
                    <TextField
                        id="IdEtiquetaOK"
                        label="IdEtiquetaOK"
                        value={idChin}
                        disabled
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.IdTipoSeccionOK && Boolean(formik.errors.IdTipoSeccionOK)}
                        helperText={formik.touched.IdTipoSeccionOK && formik.errors.IdTipoSeccionOK}
                    />
                      {/* Campo: ID */}
                      <TextField
                        id="IdEtiqueta"
                        label="IdEtiqueta"
                        value={formik.values.IdEtiqueta}
                        disabled
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.IdTipoSeccionOK && Boolean(formik.errors.IdTipoSeccionOK)}
                        helperText={formik.touched.IdTipoSeccionOK && formik.errors.IdTipoSeccionOK}
                    />
                    {/* Campo: IdTipoSeccionOK */}
                    <TextField
                        id="IdTipoSeccionOK"
                        label="IdTipoSeccionOK"
                        value={formik.values.IdTipoSeccionOK}
                        disabled
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.IdTipoSeccionOK && Boolean(formik.errors.IdTipoSeccionOK)}
                        helperText={formik.touched.IdTipoSeccionOK && formik.errors.IdTipoSeccionOK}
                    />
                    {/* Campo: Secuencia */}
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
                    {/* Campo: Valor */}
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
                    {/* Alertas */}
                    {mensajeErrorAlert && <Alert severity="error">{mensajeErrorAlert}</Alert>}
                    {mensajeExitoAlert && <Alert severity="success">{mensajeExitoAlert}</Alert>}
                    {/* Botones */}
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

export default PutInfoPresentacion;
