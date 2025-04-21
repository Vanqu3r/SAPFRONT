import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, IconButton, InputAdornment } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DeleteProduct } from '../../../services/remote/delete/DeleteProduct.jsx'; // Suponiendo que tengas este servicio para eliminar

const DeleteProductModal = ({ dataRow = {}, onClose, DeleteProductShowModal, setDeleteProductShowModal }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            IdProdServOK: dataRow.IdProdServOK || "",
            DesProdServ: dataRow.DesProdServ || "",
            CodigoBarras: dataRow.CodigoBarras || "",
        },
        validationSchema: Yup.object({
            IdProdServOK: Yup.string().required("Campo requerido"),
            DesProdServ: Yup.string().required("Campo requerido"),
            CodigoBarras: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                // Llamar al servicio para eliminar el producto
                await DeleteProduct(values.IdProdServOK);

                // Mostrar mensaje de éxito
                setMensajeExitoAlert("Producto eliminado correctamente");
                
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                setMensajeErrorAlert("No se pudo eliminar el producto. Detalles: " + (error.response?.data?.message || error.message));
            }

            setLoading(false);
        },
    });

    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
        disabled: true,  // Todos los campos están deshabilitados para evitar edición
    };

    return (
        <Dialog 
            open={DeleteProductShowModal}
            onClose={() => setDeleteProductShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography component="h4">
                        <strong>Eliminar Producto</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }} dividers>
                    <TextField
                        id="IdProdServOK"
                        label="IdProdServOK*"
                        value={formik.values.IdProdServOK}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="DesProdServ"
                        label="Producto"
                        value={formik.values.DesProdServ}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="CodigoBarras"
                        label="Código de Barras"
                        value={formik.values.CodigoBarras}
                        {...commonTextFieldProps}
                    />
                </DialogContent>
                <DialogActions sx={{ display: 'flex', flexDirection: 'row' }}>
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
                        onClick={() => onClose()}
                    >
                        <span>CERRAR</span>
                    </LoadingButton>
                    <LoadingButton
                        color="error"
                        loadingPosition="start"
                        startIcon={<DeleteIcon />}
                        variant="contained"
                        type="submit"
                        loading={Loading}
                    >
                        <span>ELIMINAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default DeleteProductModal;
