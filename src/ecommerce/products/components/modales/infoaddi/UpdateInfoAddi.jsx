import React, { useState } from 'react';
import {
    Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Alert,
    
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";


import { UpdateInfoAdi } from '../../../services/remote/put/UpdateInfoAdi';

//checar que pedo con este método
//abrir modal, cerrar modal, la nueva info, el id de la Etiqueta, el id del producto seleccionado
const UpdateInfoAddi = ({ open, onClose, selectedData, idEtiqueta, IdProductSelect}) => {
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
            Secuencia: selectedData?.Secuencia || "",
            detail_row: selectedData?.detail_row || getDetailRow(),
        },

        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert("");
            setMensajeExitoAlert("");

            try {
                // Llamar a la API usando la función UpdateInfoAdi
                const nuevaInfo = {
                    IdEtiquetaOK: values.IdEtiquetaOK,
                    IdEtiqueta: values.IdEtiqueta,
                    Valor: values.Valor,
                    IdTipoSeccionOK: values.IdTipoSeccionOK,
                    Secuencia: values.Secuencia,
                };
                console.log(nuevaInfo);
                const result = await UpdateInfoAdi(IdProductSelect, nuevaInfo);

                // Mostrar mensaje de éxito si la API responde correctamente
                setMensajeExitoAlert("Información actualizada correctamente.");
                console.log("Resultado de la API:", result);
            } catch (e) {
                console.error("Error al actualizar la información adicional:", e);
                setMensajeErrorAlert("No se pudo actualizar la información.");
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

                    <TextField
                        id="IdEtiquetaOK"
                        label="Id EtiquetaOK"
                        value={formik.values.IdEtiquetaOK}
                        disabled
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.IdEtiquetaOK && Boolean(formik.errors.IdEtiquetaOK)}
                        helperText={formik.touched.IdEtiquetaOK && formik.errors.IdEtiquetaOK}
                    />
                    <TextField
                        id="IdEtiqueta"
                        label="Id Etiqueta"
                        value={formik.values.IdEtiqueta} // Usar el valor de formik
                        disabled
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.IdEtiqueta && Boolean(formik.errors.IdEtiqueta)}
                        helperText={formik.touched.IdEtiqueta && formik.errors.IdEtiqueta}
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

export default UpdateInfoAddi;
