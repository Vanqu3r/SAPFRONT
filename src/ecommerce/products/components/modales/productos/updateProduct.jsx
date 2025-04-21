import React, { useState, useEffect, useRef , useLayoutEffect} from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, IconButton, InputAdornment } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PatchUpdateOneProduct } from '../../../services/remote/put/PatchUpdateOneProduct.jsx';
import MyAddLabels from '../../../labels/MyAddLabels.jsx';
import JsBarcode from 'jsbarcode';
// import getOneProduct from '../../../services/remote/get/getOneProduct.jsx'

const UpdateProduct = ({ dataRow = {}, onClose, UpdateProductShowModal, setDetalleProductShowModal }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);
    const [barcodeValue, setBarcodeValue] = useState(dataRow.CodigoBarras);
    const barcodeRef = useRef(null);
    const [wasModalOpened, setWasModalOpened] = useState(false); // Estado para saber si el modal se acaba de abrir

    const [indicesArray, setIndicesArray] = useState(
        dataRow.Indice ? dataRow.Indice.split('-') : []
    );
    
    

    const formik = useFormik({
        initialValues: {
            IdInstitutoOK: dataRow.IdInstitutoOK || "",
            IdProdServOK: dataRow.IdProdServOK || "",
            IdProdServBK: dataRow.IdProdServBK || "",
            CodigoBarras: dataRow.CodigoBarras || "",
            DesProdServ: dataRow.DesProdServ || "",
            Indice: dataRow.Indice || "",
        },
        validationSchema: Yup.object({
            IdProdServOK: Yup.string().required("Campo requerido"),
            IdProdServBK: Yup.string().required("Campo requerido"),
            DesProdServ: Yup.string().required("Campo requerido"),
            CodigoBarras: Yup.string()
                .required("Campo requerido")
                .notOneOf(["000000000000"], "Genera un nuevo código de barras"),
            Indice: Yup.string().required("Campo requerido"),
            IdInstitutoOK: Yup.string()
                .matches(/^\d{4}$/, 'Debe contener exactamente 4 dígitos')
                .required('Este campo es obligatorio'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
        
            try {
                // Verifica que los valores sean correctos antes de enviar
                if (!values.IdProdServOK || !values.IdInstitutoOK || !values.IdProdServBK || !values.CodigoBarras || !values.DesProdServ || !values.Indice) {
                    setMensajeErrorAlert("Por favor, complete todos los campos requeridos.");
                    setLoading(false);
                    return;
                }
        
                // Llamar al servicio para actualizar el producto
                const updatedProduct = await PatchUpdateOneProduct(values.IdProdServOK, {
                    IdInstitutoOK: values.IdInstitutoOK,
                    IdProdServBK: values.IdProdServBK,
                    CodigoBarras: values.CodigoBarras,
                    DesProdServ: values.DesProdServ,
                    Indice: values.Indice,
                });
        
                // Mostrar mensaje de éxito
                setMensajeExitoAlert("Producto actualizado correctamente");
                
            } catch (error) {
                console.error("Error al actualizar el producto:", error);
                setMensajeErrorAlert("No se pudo actualizar el producto. Detalles: " + (error.response?.data?.message || error.message));
            }
        
            // Asegurarse de que setLoading se ejecute siempre
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

    /// Este useeffect es para detectar si el modal esta abierto, y se genere el SVG del codebar
    useEffect(() => {
        // Solo ejecutar si el modal se acaba de abrir (cambia de cerrado a abierto)
        if (UpdateProductShowModal && !wasModalOpened) {
            setWasModalOpened(true); // El modal se ha abierto
        }
        // Si el modal se cierra, reseteamos el estado
        if (!UpdateProductShowModal && wasModalOpened) {
            setWasModalOpened(false);
        }
    }, [UpdateProductShowModal]);

    useEffect(() => {
        // Generar el código de barras solo cuando el modal está visible y el código de barras no es "000000000000"
        if ( barcodeRef.current && barcodeValue !== "000000000000" && wasModalOpened) {
            JsBarcode(barcodeRef.current, barcodeValue, {
                format: "CODE128",     // Tipo de código de barras
                displayValue: true,    // Mostrar el valor del código
                width: 2,              // Grosor de las barras
                height: 60,            // Altura del código de barras
                margin: 10,            // Espacio alrededor
            });
        }
    }, [ barcodeValue, wasModalOpened]); // Dependencias incluyen el estado "wasModalOpened"
    useEffect(() => {
        console.log("mensajeExitoAlert", mensajeExitoAlert);
    }, [mensajeExitoAlert]);


    useEffect(() => {
        console.log("mensajeErrorAlert", mensajeErrorAlert);
    }, [mensajeErrorAlert]);

    const handleButtonClick = () => {
        let newBarcodeValue;
        do {
            newBarcodeValue = Math.floor(Math.random() * 1000000000000).toString();
        } while (newBarcodeValue === "000000000000");

        setBarcodeValue(newBarcodeValue);
        formik.setFieldValue("CodigoBarras", newBarcodeValue);
    };

    return (
        <Dialog 
            open={UpdateProductShowModal}
            onClose={() => setUpdateProductShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography component="h4">
                        <strong>Actualizar Producto</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }} dividers>
                    <TextField
                        id="IdProdServOK"
                        label="IdProdServOK*"
                        value={formik.values.IdProdServOK}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="dense"
                        {...commonTextFieldProps}
                        error={formik.touched.IdProdServBK && Boolean(formik.errors.IdProdServBK)}
                        helperText={formik.touched.IdProdServBK && formik.errors.IdProdServBK}
                        disabled
                    />
                    <TextField
                        id="IdProdServBK"
                        label="IdProdServBK*"
                        value={formik.values.IdProdServBK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdProdServBK && Boolean(formik.errors.IdProdServBK)}
                        helperText={formik.touched.IdProdServBK && formik.errors.IdProdServBK}
                    />
                    <TextField
                        id="DesProdServ"
                        label="Producto"
                        value={formik.values.DesProdServ}
                        {...commonTextFieldProps}
                        error={formik.touched.DesProdServ && Boolean(formik.errors.DesProdServ)}
                        helperText={formik.touched.DesProdServ && formik.errors.DesProdServ}
                    />
                    <TextField
                        label="Código de Barras"
                        value={formik.values.CodigoBarras}
                        fullWidth
                        margin="dense"
                        {...commonTextFieldProps}
                        error={formik.touched.CodigoBarras && Boolean(formik.errors.CodigoBarras)}
                        helperText={formik.touched.CodigoBarras && formik.errors.CodigoBarras}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleButtonClick}>
                                        <RefreshIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <svg ref={barcodeRef}></svg>
                    <TextField
                        id="IdInstitutoOK"
                        label="IdInstitutoOK"
                        value={formik.values.IdInstitutoOK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK)}
                        helperText={formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK}
                    />
                    <MyAddLabels
                            disabled={!!mensajeExitoAlert}
                            label={"Actualizar Índices de Búsqueda"}
                            defaultValues={indicesArray} // Asegúrate de pasar `indicesArray` aquí
                            onChangeLabels={(labels) => {
                                setIndicesArray(labels);
                                formik.setFieldValue("Indice", labels.join("-")); // Actualizar el campo en el formulario
                            }}
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
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit"
                        disabled={!!mensajeExitoAlert}
                        loading={Loading}
                    >
                        <span>ACTUALIZAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UpdateProduct;
