import Swal from "sweetalert2";


export const showMensajeExito = (mensaje) => {
    Swal.fire({
        title: "<strong>¡Proceso Exitoso!</strong>", 
        text: mensaje,
        icon: "success",
        background: '#f0fff0', 
        confirmButtonColor: "#28a745", 
        confirmButtonText: "<b>¡Genial!</b>", 
        padding: '1rem', 
        customClass: {
            title: 'swal-title-success', 
            content: 'swal-content', 
        },
    });
};


export const showMensajeError = (mensaje) => {
    Swal.fire({
        title: "<strong>¡Hubo un Error!</strong>", 
        text: mensaje,
        icon: "error",
        background: '#f8d7da', 
        confirmButtonColor: "#dc3545", 
        confirmButtonText: "<b>Intenta de nuevo</b>", 
        padding: '1rem',
        customClass: {
            title: 'swal-title-error', 
            content: 'swal-content', 
        },
    });
};


export const showMensajeConfirm = async (mensaje) => {
    return new Promise((resolve) => {
        Swal.fire({
            title: "<strong>¿Estás Seguro?</strong>", 
            text: mensaje,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ffbf00", 
            cancelButtonColor: "#d33", 
            confirmButtonText: "<b>¡Sí, continuar!</b>", 
            cancelButtonText: "<b>Cancelar</b>", 
            background: '#fff3cd', 
            padding: '1.5rem', 
            customClass: {
                title: 'swal-title-warning', 
                content: 'swal-content', 
            },
        }).then((result) => {
            resolve(result.isConfirmed);
        });
    });
};
