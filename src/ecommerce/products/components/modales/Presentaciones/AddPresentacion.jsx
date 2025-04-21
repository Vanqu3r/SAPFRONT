import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert,
    IconButton, InputAdornment
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as genID } from "uuid";
import JsBarcode from 'jsbarcode';
import { AddOneProduct } from "../../../services/remote/post/Presentaciones/AddOneProduct"; // Importa la función

const AddPresentacion = ({ open, onClose, selectedData,IdProductSelect }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [loading, setLoading] = useState(false);
    const [barcodeValue, setBarcodeValue] = useState(selectedData?.CodigoBarras || "000000000000");
    const barcodeRef = useRef(null);
    console.log(IdProductSelect+'Producto M');

    // Función para generar detail_row
    const getDetailRow = (activo = "S", borrado = "N", usuarioReg = "SYSTEM") => ({
        Activo: activo,
        Borrado: borrado,
        detail_row_reg: [{ FechaReg: Date.now(), UsuarioReg: usuarioReg }],
    });

    const formik = useFormik({
        initialValues: {
            IdPresentaOK: selectedData?.IdPresentaOK || genID(),
            DesPresenta: selectedData?.DesPresenta || "",
            CodigoBarras: selectedData?.CodigoBarras || "",
            Indice: selectedData?.Indice || "",
            detail_row: selectedData?.detail_row || getDetailRow(),
        },
        validationSchema: Yup.object({
            DesPresenta: Yup.string().required("Descripción es requerida"),
            CodigoBarras: Yup.string()
                .required("Campo requerido")
                .notOneOf(["000000000000"], "Genera un nuevo código de barras"),
            Indice: Yup.string().required("Categoría es requerida"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert("");
            setMensajeExitoAlert("");
            try {
                // Llamar a la API usando la función AddOneProduct
                const result = await AddOneProduct(IdProductSelect, {
                    IdPresentaOK: values.IdPresentaOK,
                    DesPresenta: values.DesPresenta,
                    CodigoBarras: values.CodigoBarras,
                    Indice: values.Indice,
                    detail_row: values.detail_row,
                });
                
                

                // Mostrar mensaje de éxito si la API responde correctamente
                setMensajeExitoAlert("Presentación guardada correctamente.");
                console.log("Resultado de la API:", result);
            } catch (e) {
                console.error("Error al guardar la presentación:", e);
                setMensajeErrorAlert("No se pudo guardar la presentación.");
            }
            setLoading(false);
        },
    });

    const handleGenerateBarcode = () => {
        const newBarcode = Math.random().toString().slice(2, 14).padStart(12, "0");
        setBarcodeValue(newBarcode);
        formik.setFieldValue("CodigoBarras", newBarcode);
    };

    useEffect(() => {
        if (barcodeRef.current) {
            JsBarcode(barcodeRef.current, barcodeValue, {
                format: "CODE128",
                displayValue: true,
            });
        }
    }, [barcodeValue]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography variant="h6">Agregar Presentación</Typography>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        label="ID Producto"
                        value={IdProductSelect}
                        fullWidth
                        margin="dense"
                        disabled
                    />
                    <TextField
                        id="IdPresentaOK"
                        label="Id Presentación"
                        value={formik.values.IdPresentaOK} // Cambié a IdPresentaOK en vez de DesPresenta
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.IdPresentaOK && Boolean(formik.errors.IdPresentaOK)} // Corregí el campo aquí también
                        helperText={formik.touched.IdPresentaOK && formik.errors.IdPresentaOK} // Corregí el campo aquí también
                        inputProps={{
                            pattern: "[0-9-a-z]*", // Permite solo números y guiones
                            title: "Solo se permiten números y guiones (-)"
                        }}
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
                        label="Código de Barras"
                        value={formik.values.CodigoBarras}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleGenerateBarcode}>
                                        <RefreshIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={formik.touched.CodigoBarras && Boolean(formik.errors.CodigoBarras)}
                        helperText={formik.touched.CodigoBarras && formik.errors.CodigoBarras}
                    />
                    <svg ref={barcodeRef} style={{ marginTop: "10px" }}></svg>
                    <TextField
                        id="Indice"
                        label="Categoría"
                        value={formik.values.Indice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        error={formik.touched.Indice && Boolean(formik.errors.Indice)}
                        helperText={formik.touched.Indice && formik.errors.Indice}
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

export default AddPresentacion;
