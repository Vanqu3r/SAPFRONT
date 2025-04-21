import React, { useEffect, useState } from 'react';
import { DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { getProduct } from '../../../services/remote/get/getOneProduct';
import { format } from 'date-fns'; // Para formatear la fecha

const DetalleProducto = ({ dataRow, DetalleProductShowModal, setDetalleProductShowModal }) => {
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (dataRow && dataRow.IdProdServOK) {
            setLoading(true);
            getProduct(dataRow.IdProdServOK)
                .then(response => {
                    console.log('Respuesta de getProduct:', response); // Para depurar
                    setProductData(response);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error al obtener el producto:', err);
                    setError('No se pudo cargar la información del producto.');
                    setLoading(false);
                });
        }
    }, [dataRow]);

    // Formatea la fecha de registro si existe
    const formattedDate = productData?.detail_row.detail_row_reg?.[0]?.FechaReg
        ? format(new Date(productData.detail_row.detail_row_reg[0].FechaReg), 'dd/MM/yyyy HH:mm:ss')
        : '';

    // Obtiene el usuario que registró el producto si existe
    const registeredBy = productData?.detail_row.detail_row_reg?.[0]?.UsuarioReg || 'Desconocido';

    // Estado del producto
    const productStatus = productData?.Activo === 'S' ? 'Activo' : 'Inactivo';

    return (
        <>
            <DialogTitle>
                <Typography variant="h6">Detalle del Registro</Typography>
                <IconButton
                    aria-label="close"
                    onClick={() => setDetalleProductShowModal(false)}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Fecha de Registro"
                            value={formattedDate}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            disabled
                        />
                        <TextField
                            label="Registrado Por"
                            value={registeredBy}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            disabled
                        />
                        <TextField
                            label="Estado"
                            value={productStatus}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            disabled
                        />
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
            
            </DialogActions>
        </>
    );
};

export default DetalleProducto;
