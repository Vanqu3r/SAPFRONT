import React, { useState } from "react";
import {
    Dialog, DialogContent, DialogTitle,
    Typography, TextField, DialogActions, Box, Alert
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

// nuevos imports
import { useFormik } from "formik";
import * as Yup from "yup";
import { EstatusValues } from "../../../helpers/EstatusValues";
import { DetallesEstatus } from "../../../services/remote/put/DetallesEstatus"; // API para actualizar el estatus

const DetallesEstatusModal = ({ IdProdServOK,DetallesEstatusShowModal, setDetallesEstatusShowModal, EstatusToUpdate, onClose }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            IdTipoEstatusOK: EstatusToUpdate ? EstatusToUpdate.IdTipoEstatusOK : "", // Asigna el valor inicial si existe EstatusToUpdate
            Activo:  EstatusToUpdate ? EstatusToUpdate.detail_row.Activo : "",  // Si no hay valor, asigna un valor vacío
            Borrado:  EstatusToUpdate ? EstatusToUpdate.detail_row.Borrado : "",
        },
        validationSchema: Yup.object({
            IdTipoEstatusOK: Yup.string().required("Campo requerido"),
            Activo: Yup.string().required("Campo requerido"),
            Borrado: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                const Estatus = EstatusValues(values);
                // Asegúrate de que el productId esté disponible en el objeto EstatusToUpdate
                if (!IdProdServOK) {
                    throw new Error("No se encontró el ID del producto.");
                }

                await DetallesEstatus(IdProdServOK,Estatus); // Llama a la API para actualizar el Estatus
                setMensajeExitoAlert("Estatus actualizado correctamente");
                onClose();
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo actualizar el Estatus");
            }
            setLoading(false);
        },
    });

    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
        disabled: !!mensajeExitoAlert,
    };

    return (
        <Dialog
            open={DetallesEstatusShowModal}
            onClose={() => {
                setDetallesEstatusShowModal(false);
                onClose();
            }}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
            <DialogTitle>
    <Typography component="div">
        <strong>Actualizar Estatus</strong>
    </Typography>
</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    <TextField
                        id="IdTipoEstatusOK"
                        label="IdTipoEstatusOK*"
                        value={formik.values.IdTipoEstatusOK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdTipoEstatusOK && Boolean(formik.errors.IdTipoEstatusOK)}
                        helperText={formik.touched.IdTipoEstatusOK && formik.errors.IdTipoEstatusOK}
                        disabled
                    />
                    <TextField
                        id="Activo"
                        label="Activo*"
                        value={formik.values.Activo}
                        {...commonTextFieldProps}
                        error={formik.touched.Activo && Boolean(formik.errors.Activo)}
                        helperText={formik.touched.Activo && formik.errors.Activo}
                    />
                    <TextField
                        id="Borrado"
                        label="Borrado*"
                        value={formik.values.Borrado}
                        {...commonTextFieldProps}
                        error={formik.touched.Borrado && Boolean(formik.errors.Borrado)}
                        helperText={formik.touched.Borrado && formik.errors.Borrado}
                    />
                </DialogContent>
                <DialogActions
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
                    <Box m="auto">
                        {mensajeErrorAlert && (
                            <Alert severity="error">
                                <b>¡ERROR!</b> ─ {mensajeErrorAlert}
                            </Alert>
                        )}
                        {mensajeExitoAlert && (
                            <Alert severity="success">
                                <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
                            </Alert>
                        )}
                    </Box>
                    {/*Boton de Cerrar. */}
                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon />}
                        variant="outlined"
                        onClick={() => onClose()

                        }
                    >
                        <span>CERRAR</span>
                    </LoadingButton>

                    {/*Boton de Guardar. */}
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit"
                        disabled={!!mensajeExitoAlert}
                        loading={Loading}

                    >
                        <span>GUARDAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default DetallesEstatusModal;