import { useEffect, useState } from "react";
//basada en la tabla de estatus
//Material UI
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";

// DB modaless de info adicional
//update add delete y get
import { getProduct } from "../../services/remote/get/getOneProduct";
import AddInfoAddi from "../modales/infoaddi/AddInfoAddi"
import UpdateInfoAddi from "../modales/infoaddi/UpdateInfoAddi";
import { DeleteInfoAdi } from "../../services/remote/delete/DeleteInfoAdi.jsx";
import {
    showMensajeConfirm, showMensajeError,showMensajeExito } from "../../../../share/components/messages/MySwalAlerts.jsx";
// Columnas de la tabla
const columns = [

    {
        accessorKey: "IdEtiqueta",
        header: "Id de la Etiqueta",
        size: 30, //small column
    },
    {
        accessorKey: "Valor",
        header: "Valor",
        size: 150, //small column
    },
    {
        accessorKey: "IdTipoSeccionOK",
        header: "ID Tipo de Seccion OK",
        size: 30, //small column
    },
    {
        accessorKey: "Secuencia",
        header: "Secuencia",
        size: 30, //small column
    },

];

// Tabla en el Front. 
const InfoAddiTable = ({ datosSeleccionados }) => {
    //Modales de Información Adicional update delete add

    //MODALES

    //abrir y cerrar modales
    //POST
    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);

    //PUT
    const openPUTModal = () => {
        if (!dataRow?.IdEtiqueta) {
            console.error("No se ha seleccionado un ID.");
            return;
        }
        setIsPutModalOpen(true);
    };
    const closePUTModal = () => setIsPutModalOpen(false);

    //DELETE
    const openDeleteModal = () => {
        if (!dataRow?.IdEtiqueta) {
            console.error("No se ha seleccionado un ID.");
            return;
        }
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => setIsDeleteModalOpen(false);


    //abrir modales put, post y delete
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
    const [isPutModalOpen, setIsPutModalOpen] = useState(false); 

    const [EstatusSel, setEstatusSel] = useState(null); // Producto seleccionado

    // controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);
    const [ProductSelec, setProductSel] = useState(true);
    // controlar el estado de la data.
    const [productsData, setProductsData] = useState([]);
    // Controlar la informacion seleccionada
    const [dataRow, setDataRow] = useState();

    // Función para manejar el clic en una fila
    const sendDataRow = (rowData) => {
        // Guardar la informacion seleccionada
        setDataRow(rowData.original);
        console.log(rowData.original);
    };


    async function fetchData() {
        try {
            // Obtener los id's seleccionados
            const {IdProdServOK} = datosSeleccionados;

            // Verificar si fueron seleccionados los id's; de lo contrario, no hacer nada.
            if ( IdProdServOK === "0" ) {
                setLoadingTable(false);
                return;
            }

            // Obtener los datos de INFORMACION ADICIONAL
            const productsData = await getProduct(IdProdServOK);

            setProductsData(productsData.info_ad); //aquí se debería de pasar la información adicional del producto
            console.log("DATOS PRODUCTS INFO ADICIONAL ", productsData.info_ad)
            ;
            // Cambiar el estado del indicador (loading) a false.
            setLoadingTable(false);
        } catch (error) {
            console.error("Error al obtener la data en useEffect: ", error);
        }
    }

    const handleDelete = async () => {
        const IdEtiqueta  = dataRow.IdEtiqueta;
        const res = await showMensajeConfirm(
            `La siguiente información: ${
                dataRow.IdEtiqueta
            } será eliminada, ¿Desea continuar?`
        );
        
        if (res) {
            try {
                // Obtén los IDs necesarios
                const { IdProdServOK } = datosSeleccionados;
                 // Asume que tienes el idEti disponible
                console.log(IdEtiqueta);
    
                // Llamada a la función DeleteInfoAdi para eliminar la info
                await DeleteInfoAdi(IdProdServOK, IdEtiqueta);
    
                // Mostrar mensaje de éxito
                showMensajeExito("Producto eliminado con éxito");
    
                // Actualizar los datos (recargar la lista, por ejemplo)
                fetchData();
            } catch (e) {
                console.error("Error al eliminar el producto:", e);
                showMensajeError(`No se pudo eliminar el producto.`);
            }
        }
    };
    

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <Box>
            <Box>
                <MaterialReactTable
                    columns={columns}
                    initialState={{ density: "compact", showGlobalFilter: true }}
                    data={productsData}
                    state={{ isLoading: loadingTable }}
                    enableMultiRowSelection={false}
                    enableRowSelection={true}
                    muiTableBodyRowProps={({ row }) => ({

                        onClick: row.getToggleSelectedHandler(),
                        onClickCapture: () => sendDataRow(row),
                        sx: { cursor: 'pointer' },
                    })}
                    renderTopToolbarCustomActions={() => (
                        <>
                            {/* ------- BARRA DE ACCIONES ------ */}
                            <Stack direction="row" sx={{ m: 1 }}>
                                <Box>
                                    <Tooltip title="Agregar">
                                        <IconButton onClick={openAddModal}>
                                            <AddCircleIcon />
                                        </IconButton>
                                    </Tooltip>
                               

                                <Tooltip title="Editar">
                                    <IconButton
                                       
                                            onClick={() => {                                      
                                                openPUTModal();
                                            }}
                                            disabled={!dataRow} 
  
                                        
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>


                                <Tooltip title="Eliminar">
                                    <IconButton
                                            onClick={() => {                                         
                                                handleDelete();
                                            }}
                                            disabled={!dataRow} 
                                            
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Detalles ">
                                    <IconButton
                                    
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Refrescar">
                                    <IconButton
                                        onClick={fetchData}>
                                        <RefreshIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Stack>
                    {/* ------- BARRA DE ACCIONES FIN ------ */}
                </>
                    )}
                />
                {/* M O D A L E S */}

                {isAddModalOpen && (
                    <AddInfoAddi
                        open={isAddModalOpen}
                        onClose={closeAddModal}
                        datosSeleccionados={datosSeleccionados}
                        IdProductSelect={datosSeleccionados.IdProdServOK}
                    />
                )}

                {isPutModalOpen && (
                    <UpdateInfoAddi
                    open={isPutModalOpen}
                    onClose={closePUTModal}
                            
                    selectedData={dataRow} // Se pasa todo el objeto de datos del producto seleccionado
                    idEtiqueta={dataRow?.IdEtiqueta} // 'idEtiqueta' debería ser el id que corresponde en tu caso
                    IdProductSelect={datosSeleccionados.IdProdServOK} // Aquí pasas el ID del producto seleccionado

                    />

                )}

                
            </Box>
        </Box>
    );
};

export default InfoAddiTable;