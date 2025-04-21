import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Alert
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import JsBarcode from 'jsbarcode';
import { AddOneProduct } from "../../../services/remote/put/presentaciones/putpresentaciones";

const AddPresentacionPUT = ({ open, onClose, selectedData, IdProductSelect, IdPresentaSelect }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [loading, setLoading] = useState(false);
    const barcodeRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            IdPresentaOK: selectedData?.IdPresentaOK || "",
            DesPresenta: selectedData?.DesPresenta || "",
            CodigoBarras: selectedData?.CodigoBarras || "",
            Indice: selectedData?.Indice || "",
        },
        validationSchema: Yup.object({
            DesPresenta: Yup.string().required("Descripción es requerida"),
            CodigoBarras: Yup.string()
                .required("Código de barras es requerido")
                .notOneOf(["000000000000"], "El código de barras no puede ser '000000000000'"),
            Indice: Yup.string().required("Categoría es requerida"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert("");
            setMensajeExitoAlert("");
            try {
                const result = await AddOneProduct(IdProductSelect, IdPresentaSelect, values);
                setMensajeExitoAlert("Presentación guardada correctamente.");
                console.log("Resultado de la API:", result);
            } catch (e) {
                console.error("Error al guardar la presentación:", e);
                setMensajeErrorAlert("No se pudo guardar la presentación.");
            }
            setLoading(false);
        },
    });

    // Generar el código de barras
    const generateBarcode = () => {
        if (barcodeRef.current && formik.values.CodigoBarras) {
            try {
                JsBarcode(barcodeRef.current, formik.values.CodigoBarras, {
                    format: "CODE128",
                    displayValue: true,
                });
            } catch (err) {
                console.error("Error al generar el código de barras:", err);
            }
        }
    };

    // Usar useEffect para generar el código de barras al abrir el modal
    useEffect(() => {
        if (open) {
            // Asegurarse de que el DOM esté renderizado antes de generar el código
            setTimeout(() => {
                generateBarcode();
            }, 0);
        }
    }, [open, formik.values.CodigoBarras]);
    /*Si el DOM aún no ha terminado de renderizar ese elemento cuando intentas generar el código,
    puede causar problemas. Por eso es importante sincronizar el ciclo de vida de React con el 
    momento en que el DOM está listo. */

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography variant="h6">Editar Presentación</Typography>
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
                        value={formik.values.IdPresentaOK}
                        fullWidth
                        disabled
                        margin="dense"
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
                        fullWidth
                        margin="dense"
                        disabled
                    />
                    {/* SVG para el código de barras */}
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

export default AddPresentacionPUT;
