import React, { useState, useEffect} from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions,  Box, Alert} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NegocioValues } from '../../../helpers/NegocioValues';
import { AddOneNegocio } from '../../../services/remote/post/AddOneNegocio';
import { v4 as genID } from "uuid";
import { getDetailRow } from '../../../helpers/utils';


const AddNegocio = ({AddNegocioShowModal, setAddNegocioShowModal,datosSeleccionados,onClose}) => {

    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");

    const [Loading, setLoading] = useState(false);

    const generateUniqueId = () => {
        const randomDigits = genID().replace(/-/g, '').slice(0, 12);
        return `9000-${randomDigits}`;
    };
    
    const uniqueId = generateUniqueId(); 
    

    const formik = useFormik({
        initialValues: {
            IdNegocioOK: uniqueId,
            DetailRow: getDetailRow(),
        },
        validationSchema: Yup.object({
            IdNegocioOK: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
        
            try {
                const Negocio = NegocioValues(values); 
                console.log("<<Negocio>>", Negocio);  
                await AddOneNegocio(datosSeleccionados.IdProdServOK,Negocio); 
                setMensajeExitoAlert("Negocio creado y guardado correctamente");
            } catch (e) {
                console.log("Error al crear el Negocio:", e); 
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el Negocio");
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
        console.log("mensajeExitoAlert", mensajeExitoAlert);
    }, [mensajeExitoAlert]); // Se ejecuta solo cuando mensajeExitoAlert cambia
    
    useEffect(() => {
        console.log("mensajeErrorAlert", mensajeErrorAlert);
    }, [mensajeErrorAlert]);


    return(
        <Dialog 
            open={AddNegocioShowModal}
            onClose={() => setAddNegocioShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography component="h4">
                        <strong>Agregar Nuevo Negocio</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent 
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    <TextField
                        id="IdNegocioOK"
                        label="IdNegocioOK*"
                        value={formik.values.IdNegocioOK}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        {...commonTextFieldProps}
                        error={formik.touched.IdProdServBK && Boolean(formik.errors.IdProdServBK)}
                        helperText={formik.touched.IdProdServBK && formik.errors.IdProdServBK}
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
                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon />}
                        variant="outlined"
                        onClick={() => onClose()/* setAddProductShowModal(false) */}
                    >
                        <span>CERRAR</span>
                    </LoadingButton>
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
export default AddNegocio;