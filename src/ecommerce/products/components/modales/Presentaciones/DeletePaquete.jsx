import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  DialogActions,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePaquete } from "../../../services/remote/delete/Presentaciones/deletepre"

const DeletePaquete = ({ open, onClose, selectedData, productId, preID, idChin }) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [loading, setLoading] = useState(false);
  console.log("si", productId, preID, idChin)


  const handleDelete = async () => {
    setLoading(true);
    setMensajeErrorAlert("");
    setMensajeExitoAlert("");
    try {
      // Llamar a la función para eliminar con los parámetros necesarios

      const result = await deletePaquete(preID, productId, idChin);

      // Mostrar mensaje de éxito si la API responde correctamente
      setMensajeExitoAlert("Presentación eliminada correctamente.");
      console.log("Resultado de la API:", result);

      // Puedes cerrar el modal automáticamente después de eliminar
      onClose();
    } catch (e) {
      console.error("Error al eliminar la presentación:", e);
      setMensajeErrorAlert("No se pudo eliminar la presentación.");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h6">Eliminar Paquete</Typography>
      </DialogTitle>
      <DialogContent>
        {mensajeErrorAlert && <Alert severity="error">{mensajeErrorAlert}</Alert>}
        {mensajeExitoAlert && <Alert severity="success">{mensajeExitoAlert}</Alert>}
        <Typography variant="body1">
          ¿Estás seguro de que deseas eliminar la informacion con ID{' '}
          <strong>{idChin}</strong> y descripción {' '}
          <strong>{selectedData?.DesPresenta}</strong>? Esta acción no se puede deshacer.
        </Typography>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          color="secondary"
          variant="outlined"
          onClick={onClose}
          startIcon={<CloseIcon />}
        >
          Cancelar
        </LoadingButton>
        <LoadingButton
          color="error"
          variant="contained"
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
          loading={loading}
        >
          Eliminar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePaquete;
