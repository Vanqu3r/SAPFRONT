import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions,  Box, Alert,
    FormControlLabel, Checkbox, InputLabel, Select, IconButton, InputAdornment } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh"; 
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ProductValues } from '../../../helpers/ProductValues';
import { AddOneProduct } from '../../../services/remote/post/AddOneProduct';
import MyAddLabels from '../../../labels/MyAddLabels.jsx';
import { v4 as genID } from "uuid";
import JsBarcode from 'jsbarcode';



const AddProduct = ({AddProductShowModal, setAddProductShowModal,onClose}) => {

    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");

    const [Loading, setLoading] = useState(false);

    const [barcodeValue, setBarcodeValue] = useState("000000000000");
    const barcodeRef = useRef(null); // Reference for barcode SVG

    const ProductsValuesLabel = [
        { IdValorOK: "IdIndustrial", Valor: "Tecnologia" },
        { IdValorOK: "IdComercial", Valor: "Comida" },
        { IdValorOK: "IdEducacional", Valor: "Ropa" },
        { IdValorOK: "IdELimpieza", Valor: "Limpieza" },
        { IdValorOK: "IdRefrigerados", Valor: "Refrigerados" },
        { IdValorOK: "IdJuguetes", Valor: "Juguetes" },
        { IdValorOK: "IdShampoo", Valor: "Shampoo" },
        // Agrega más tipos de giro según sea necesario
    ];

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


    const generateUniqueId = () => {
        // Obtener un UUID y tomar solo los primeros 12 caracteres después de "9001-"
        const randomDigits = genID().replace(/-/g, '').slice(0, 12);  // Extrae los primeros 12 dígitos
        return `9000-${randomDigits}`;
    };
    
    const uniqueId = generateUniqueId(); 
    

    const formik = useFormik({
        initialValues: {
            IdProdServOK: uniqueId,
            IdProdServBK: "",
            DesProdServ: "",
            CodigoBarras: "",
            Indice: "",
            IdInstitutoOK: "",
             // Agregamos el objeto detail_row en initialValues
             DetailRow: getDetailRow(),
    
        },
        validationSchema: Yup.object({
            IdProdServOK: Yup.string().required("Campo requerido"),
            IdProdServBK: Yup.string().required("Campo requerido"),
            DesProdServ: Yup.string().required("Campo requerido"),
            CodigoBarras: Yup.string()
            .required("Campo requerido")
            .notOneOf(["000000000000"], "Genera un nuevo codigo de barras"),
            Indice: Yup.string().required("Campo requerido"),
            IdInstitutoOK: Yup.string()
            .matches(/^\d{4}$/, 'Debe contener exactamente 4 dígitos')
            .required('Este campo es obligatorio'),
        }),
        onSubmit: async (values) => {
            console.log("Formulario enviado con los valores:", values);  // Verifica si este log aparece
            setLoading(true);
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
        
            if (!values.Indice) {
                console.log("Índice vacío. No se enviará la solicitud.");
                setMensajeErrorAlert("Debes Agregar Índices de Búsqueda");
                setLoading(false);
                return;
            }
        
            try {
                const Product = ProductValues(values); 
                console.log("<<Producto>>", Product);  // Verifica el objeto antes de enviarlo
                await AddOneProduct(Product); 
                setMensajeExitoAlert("Producto creado y guardado correctamente");
            } catch (e) {
                console.log("Error al crear el producto:", e);  // Captura el error si ocurre
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el Producto");
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
        if (barcodeRef.current) {
          JsBarcode(barcodeRef.current, barcodeValue, {
            format: "CODE128",
            displayValue: true, // Mostrar el valor debajo del código de barras
          });
        }
      }, [barcodeValue]); // Re-run when barcodeValue changes


      useEffect(() => {
        console.log("mensajeExitoAlert", mensajeExitoAlert);
    }, [mensajeExitoAlert]); // Se ejecuta solo cuando mensajeExitoAlert cambia
    
    useEffect(() => {
        console.log("mensajeErrorAlert", mensajeErrorAlert);
    }, [mensajeErrorAlert]);





    const handleButtonClick = () => {
        let newBarcodeValue;
        do {
            newBarcodeValue = Math.floor(Math.random() * 10000000000).toString();
        } while (newBarcodeValue === "000000000000");
    
        setBarcodeValue(newBarcodeValue); // Cambia el valor del código de barras localmente
        formik.setFieldValue("CodigoBarras", newBarcodeValue); // Actualiza el valor de Formik
    };

    return(
        <Dialog 
            open={AddProductShowModal}
            onClose={() => setAddProductShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* FIC: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography component="h4">
                        <strong>Agregar Nuevo Producto</strong>
                    </Typography>
                </DialogTitle>
                {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
                <DialogContent 
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* FIC: Campos de captura o selección */}
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
                                    <RefreshIcon /> {/* El ícono de refrescar */}
                                </IconButton>
                                </InputAdornment>
                            ),
                            }}
                            
                        />

                        {/* Aquí se renderiza el código de barras */}
                        <svg ref={barcodeRef}></svg>
                    {/* <TextField
                        id="Indice"
                        label="Categoria"
                        value={formik.values.Indice}
                        {...commonTextFieldProps}
                        error={formik.touched.Indice && Boolean(formik.errors.Indice)}
                        helperText={formik.touched.Indice && formik.errors.Indice }
                    /> */}

                        {/* <InputLabel>Selecciona una categoria</InputLabel>
                        <Select
                            value={formik.values.Indice}
                            onChange={formik.handleChange}
                            name="Indice"
                            onBlur={formik.handleBlur}
                            disabled={!!mensajeExitoAlert}
                        >
                            {ProductsValuesLabel.map((Indice) => { 
                                return (
                                    <MenuItem
                                        value={`Indice-${Indice.IdValorOK}`}
                                        key={Indice.Valor}
                                    >
                                        {Indice.Valor} 
                                    </MenuItem>
                                );
                            })}
                        </Select> */}
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
                        label={"Agrega Índices de Búsqueda"}
                        onChangeLabels={(labels) =>
                        (formik.values.Indice = labels.join("-"))
                        }
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

                    {/*  Boton de Cerrar. */}
                    <LoadingButton
                         color="secondary"
                         loadingPosition="start"
                         startIcon={<CloseIcon />}
                         variant="outlined"
                         onClick={() => onClose()}
                     >
                         <span>CERRAR</span>

                            </LoadingButton>
                            {/* Boton de Guardar. */}
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
export default AddProduct;