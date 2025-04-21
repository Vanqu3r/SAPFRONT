import { useEffect, useState } from "react";

// Material UI
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";

// Servicios
import { getPresentacionesPaquete } from "../../../services/remote/get/Presentaciones/getPresentacionesPaquete";
import AddPaquete from "../../modales/Presentaciones/AddPaquete";
import PutPaquete from "../../modales/Presentaciones/Putpaquete";
import DeletePaquete from "../../modales/Presentaciones/DeletePaquete";
// Columnas de la tabla

const columnas = [
    {
        accessorKey: "IdPresentaOK",
        header: "id",
        size: 150,
    },
    {
        accessorKey: "DesPresenta",
        header: "Descripción",
        size: 150,
    },
    {
        accessorKey: "Cantidad",
        header: "Cantidad",
        size: 30,
    },
    {
        accessorKey: "detail_row.Activo",
        header: "Activo",
        size: 30,
    },
    {
        accessorKey: "detail_row.Borrado",
        header: "Eliminado",
        size: 30,
    },
];

const PresentacionesTable = ({ datosSeleccionados, setDatosSeleccionados, selectedId }) => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [productsData, setProductsData] = useState([]);
    const [dataRow, setDataRow] = useState(null);
    const [isPutModalOpen, setIsPutModalOpen] = useState(false); // Estado para el modal put
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Estado para el modal de agregar
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para el modal de eliminar
    //const [selectedId, setSelectedId] = useState(null); // Estado para guardar el ID de la presentación

    // Funciones para abrir y cerrar los modales
    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);

    //PUT
    const openPUTModal = () => {
        if (!dataRow?.IdPresentaOK) {
            console.error("No se ha seleccionado un ID.");
            return;
        }
        setIsPutModalOpen(true);
    };
    const closePUTModal = () => setIsPutModalOpen(false);
    //DELETE
    const openDeleteModal = () => {
        if (!dataRow?.IdPresentaOK) {
            console.error("No se ha seleccionado un ID.");
            return;
        }
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => setIsDeleteModalOpen(false);


    // Función para manejar el clic en una fila
    const sendDataRow = (rowData) => {
        setDataRow(rowData.original); // Guarda la fila seleccionada
        //setSelectedId(rowData.original.IdPresentaOK); // Guarda el ID de la presentación seleccionada
    };

    async function fetchData() {
        try {
            const {IdProdServOK, IdProdServBK } = datosSeleccionados;

            // Verificar que los ID's estén correctamente seleccionados
            if (IdProdServOK === "0" || IdProdServBK === "0") {
                setLoadingTable(false);
                return;
            }

            // Obtener los datos de las presentaciones
            const productsData = await getPresentacionesPaquete(IdProdServOK, selectedId);

            setProductsData(productsData || []); // Asigna directamente los datos
            setLoadingTable(false);
        } catch (error) {
            console.error("Error al obtener las presentaciones: ", error);
            setLoadingTable(false);
        }
    }

    useEffect(() => {
        fetchData(); // Llama a fetchData cada vez que cambian los datos seleccionados
    }, [datosSeleccionados]);

    return (
        <Box>
            <MaterialReactTable
                columns={columnas}
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
                    <Stack direction="row" sx={{ m: 1 }}>
                        <Box>
                            {/* Barra de acciones */}
                            <Tooltip title="Agregar">
                                <IconButton onClick={openAddModal}>
                                    <AddCircleIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar">
                                <IconButton onClick={openPUTModal} disabled={!dataRow}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                                <IconButton onClick={openDeleteModal} disabled={!dataRow}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Refrescar">
                                <IconButton onClick={fetchData}>
                                    <RefreshIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Stack>
                )}
            />

            {/* Modales */}
            {isAddModalOpen && (
                < AddPaquete
                    open={isAddModalOpen}
                    onClose={() => {
                        setIsAddModalOpen(false);
                        fetchData();
                    }}
                    selectedRowData={datosSeleccionados}
                    IdProductSelect={datosSeleccionados.IdProdServOK}
                    selectedId={selectedId}
                    {...console.log(datosSeleccionados.IdProdServOK, selectedId)}
                />
            )}


            {isPutModalOpen && (
                <PutPaquete
                    open={isPutModalOpen}
                    onClose={() => {
                        setIsPutModalOpen(false);
                        fetchData();
                    }}
                    //dataRow={dataRow} // Pasa la fila seleccionada al modal
                    selectedId={selectedId} //id de presentacion
                    {...console.log(selectedId, datosSeleccionados.IdProdServOK)}
                    IdProductSelect={datosSeleccionados.IdProdServOK}
                    selectedRowData={dataRow}
                    idChin={dataRow?.IdPresentaOK} // Asegúrate de usar dataRow en lugar de rowData
                />
            )}

            {isDeleteModalOpen && (
                <DeletePaquete
                    open={isDeleteModalOpen}
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        fetchData();
                    }}
                    // dataRow={dataRow} // Pasa la fila seleccionada al modal
                    preID={datosSeleccionados.IdProdServOK} //id de presentacion
                    productId={selectedId}
                    selectedData={dataRow}
                    idChin={dataRow?.IdPresentaOK} // Asegúrate de usar dataRow en lugar de rowData
                    {...console.log(selectedId, datosSeleccionados.IdProdServOK, dataRow?.IdPresentaOK)}
                />
            )}



            <Dialog open={false}>
                {/* Agregar Modal según sea necesario */}
            </Dialog>

            {/* Mostrar el ID de la presentación seleccionada */}
            {selectedId && <p>ID de la Presentación seleccionada: {selectedId}</p>}
        </Box>
    );
};

export default PresentacionesTable;
