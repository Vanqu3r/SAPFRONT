import React, { useState, useEffect} from 'react';
import { Dialog, DialogContent, DialogTitle, 
    Typography, DialogActions, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteOneNegocio } from '../../../services/remote/delete/DeleteOneNegocio';

//EL CONTENIDO DE ESTE ARCHIVO HA QUEDADO INUTILIZADO EN SU TOTALIDAD PERO ME DA MIEDO ELIMINARLO

const DeleteNegocioModal = ({DeleteNegocioShowModal,setDeleteNegocioShowModal,datosSeleccionados,negocio,onClose}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const handleDelete = async () =>{
        setLoading(true);
        setMensajeErrorAlert(null);
        setMensajeExitoAlert(null);
        try {
            await DeleteOneNegocio(datosSeleccionados.IdProdServOK,negocio.IdNegocioOK);
            setMensajeExitoAlert("Negocio eliminado correctamente");
        } catch (e) {
            console.log("Error al eliminar el Negocio:", e);  // Captura el error si ocurre
            setMensajeExitoAlert(null);
            setMensajeErrorAlert("No se pudo eliminar el Negocio");
        }
        setLoading(false);
    }

    useEffect(() => {
        console.log("mensajeExitoAlert", mensajeExitoAlert);
    }, [mensajeExitoAlert]); // Se ejecuta solo cuando mensajeExitoAlert cambia
    
    useEffect(() => {
        console.log("mensajeErrorAlert", mensajeErrorAlert);
    }, [mensajeErrorAlert]);


    const commonTextFieldProps = {
        fullWidth: true,
        margin: "dense",
    };

    return(
        <Dialog open={DeleteNegocioShowModal} onClose={onClose} fullWidth >
                <DialogTitle>
                    <Typography component="h6">
                        <strong>¿Eliminar el Negocio?</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }} dividers >
                    {mensajeErrorAlert && <Alert severity="error">{mensajeErrorAlert}</Alert>}
                    {mensajeExitoAlert && <Alert severity="success">{mensajeExitoAlert}</Alert>}
                    <Typography variant="body1">
                        ¿Está seguro que desea eliminar el negocio con ID  
                        <strong> {negocio.IdNegocioOK}</strong>?
                        <br />
                        <br />
                    </Typography>
                    <Typography variant='body2'>
                        Esta acción no se puede deshacer.
                    </Typography>

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
                         onClick={() => onClose()}
                     >
                         <span>CERRAR</span>
                    </LoadingButton>
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<DeleteIcon />}
                        variant="contained"
                        //type="submit"
                        disabled={!!mensajeExitoAlert}
                        loading={Loading}
                        onClick={()=> handleDelete()}
                    >
                        <span>Eliminar</span>
                    </LoadingButton>
                </DialogActions>
            
        </Dialog>
    );
};
export default DeleteNegocioModal;