import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions,  Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EstatusValues } from '../../../helpers/EstatusValues.jsx';
import { AddOneEstatus } from '../../../services/remote/post/AddOneEstatus.jsx';

const AddEstatusModal = ({IdProdServOK,AddEstatusShowModal, setAddEstatusShowModal,onClose}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");

    const [Loading, setLoading] = useState(false);

    // Función para generar detail_row
    const getDetailRow = (activo = "S", borrado = "N", usuarioReg = "SYSTEM") => {
        return {
            Activo: activo,
            Borrado: borrado,
            detail_row_reg: [getDetailRowReg(usuarioReg)],
        };
    };

    const getDetailRowReg = (usuarioReg = "SYSTEM") => {
        return {
            FechaReg: Date.now(),
            UsuarioReg: usuarioReg,
        };
    };

    const formik = useFormik({
        initialValues: {
            IdTipoEstatusOK: "",
            Actual: "",
            Observacion: "",
             // Agregamos el objeto detail_row en initialValues
             DetailRow: getDetailRow(),
    
        },
        validationSchema: Yup.object({
            IdTipoEstatusOK: Yup.string().required("Campo requerido"),
            Actual: Yup.string(),
            Observacion: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
        
            try {
                const Estatus = EstatusValues(values); 
                await AddOneEstatus(IdProdServOK,Estatus); 
                setMensajeExitoAlert("Estatus creado y guardado correctamente");
            } catch (e) {
                console.log("Error al crear el Estatus:", e);  // Captura el error si ocurre
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el Estatus");
            }
            setLoading(false);
        }
    });

    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
        disabled: !!mensajeExitoAlert,
    };
    
    useEffect(() => {
        console.log("mensajeErrorAlert", mensajeErrorAlert);
    }, [mensajeErrorAlert]);

    return(
        <Dialog 
            open={AddEstatusShowModal}
            onClose={() => setAddEstatusShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography component="h4">
                        <strong>Agregar Nuevo Estatus</strong>
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
                
                    />
                    <TextField
                        id="Actual"
                        label="Actual*"
                        value={formik.values.Actual}
                        {...commonTextFieldProps}
                        error={formik.touched.Actual && Boolean(formik.errors.Actual)}
                        helperText={formik.touched.Actual && formik.errors.Actual}
                
                    />
                    <TextField
                        id="Observacion"
                        label="Observacion"
                        value={formik.values.Observacion}
                        {...commonTextFieldProps}
                        error={formik.touched.Observacion && Boolean(formik.errors.Observacion)}
                        helperText={formik.touched.Observacion && formik.errors.Observacion}
                    />
                          {/* Mostrar la información del 'detail_row_reg' */}
                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                        Detalle de Registro
                    </Typography>
                    <TextField
                        id="detail_row_reg.FechaReg"
                        label="Fecha de Registro"
                        value={new Date(formik.values.DetailRow.detail_row_reg[0].FechaReg).toLocaleString()}
                        fullWidth
                        margin="dense"
                        disabled
                    />
                    <TextField
                        id="detail_row_reg.UsuarioReg"
                        label="Usuario de Registro"
                        value={formik.values.DetailRow.detail_row_reg[0].UsuarioReg}
                        fullWidth
                        margin="dense"
                        disabled
                    />
                </DialogContent>
                {/* FIC: Aqui van las acciones del usuario como son las alertas o botones */}
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

                    {/* FIC: Boton de Cerrar. */}
                    <LoadingButton
                         color="secondary"
                         loadingPosition="start"
                         startIcon={<CloseIcon />}
                         variant="outlined"
                         onClick={() => onClose()}
                     >
                         <span>CERRAR</span>

                            </LoadingButton>
                            {/* FIC: Boton de Guardar. */}
                            <LoadingButton
                             color="primary"
                             loadingPosition="start"
                             startIcon={<SaveIcon />}
                             variant="contained"
                             type="submit"
                             disabled={!!mensajeExitoAlert}
                             loading={Loading}
                         >
                             <span>AGREGAR</span>
                        </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default AddEstatusModal;