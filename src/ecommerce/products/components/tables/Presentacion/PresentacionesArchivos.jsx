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
import { getPresentacionesArchivos } from "../../../services/remote/get/Presentaciones/getPresentacionesInfoArchivos";
import AddArchivoPresentacion from "../../modales/Presentaciones/addArchivoPresentacion";
import DeleteArchivo from "../../modales/Presentaciones/DeleteArchivo";
import AchivoPutPresntacion from "../../modales/Presentaciones/achivoPutPresntacion";
// Columnas de la tabla

const columnas = [
    {
        accessorKey: "DesArchivo", // Accede al campo 'DesArchivo'
        header: "Descripción del Archivo",
        size: 150,
    },
    {
        accessorKey: "IdArchivoBK", // Accede al campo 'IdArchivoBK'
        header: "Id Archivo BK",
        size: 250,
    },
    {
        accessorKey: "IdArchivoOK", // Accede al campo 'IdArchivoOK'
        header: "Id Archivo OK",
        size: 250,
    },
    {
        accessorKey: "IdTipoArchivoOK", // Accede al campo 'IdTipoArchivoOK'
        header: "Tipo de Archivo",
        size: 200,
    },
    {
        accessorKey: "IdTipoSeccionOK", // Accede al campo 'IdTipoSeccionOK'
        header: "Tipo de Sección",
        size: 250,
    },
    {
        accessorKey: "Principal", // Accede al campo 'Principal'
        header: "Principal",
        size: 100,
    },
    {
        accessorKey: "Secuencia", // Accede al campo 'Secuencia'
        header: "Secuencia",
        size: 80,
    },
    {
        accessorKey: "RutaArchivo", // Accede al campo 'RutaArchivo'
        header: "URL del Archivo",
        size: 350,
    },
];



const PresentacionesTable = ({ datosSeleccionados, setDatosSeleccionados, selectedId }) => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [productsData, setProductsData] = useState([]);
    const [dataRow, setDataRow] = useState(null);
    const [isPutModalOpen, setIsPutModalOpen] = useState(false); // Estado para el modal put
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Estado para el modal de agregar
    //const [selectedId, setSelectedId] = useState(null); // Estado para guardar el ID de la presentación
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para el modal de eliminar
    // Funciones para abrir y cerrar los modales
    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);
    //DELETE
    const openDeleteModal = () => {
        if (!dataRow?.IdArchivoOK) {
            console.error("No se ha seleccionado un ID.");
            return;
        }
        setIsDeleteModalOpen(true);
    };

    const openPUTModal = () => {
        if (!dataRow?.IdArchivoOK) {
            console.error("No se ha seleccionado un ID.");
            return;
        }
        setIsPutModalOpen(true);
    };


    // Función para manejar el clic en una fila
    const sendDataRow = (rowData) => {
        setDataRow(rowData.original); // Guarda la fila seleccionada
        //setSelectedId(rowData.original.IdPresentaOK); // Guarda el ID de la presentación seleccionada
    };

    async function fetchData() {
        try {
            const {IdProdServOK, IdProdServBK } = datosSeleccionados;
            console.log("TABLA", datosSeleccionados.IdProdServOK);
            // Verificar que los ID's estén correctamente seleccionados
            if (IdProdServOK === "0" || IdProdServBK === "0") {
                setLoadingTable(false);
                return;
            }

            // Obtener los datos de las presentaciones
            //MOVER EL DATO ESTATICO
            const productsData = await getPresentacionesArchivos(IdProdServOK, selectedId);

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
            <Dialog open={false}>
                {/* Agregar Modal según sea necesario */}
            </Dialog>

            {isAddModalOpen && (
                < AddArchivoPresentacion
                    open={isAddModalOpen}
                    onClose={() => {
                        setIsAddModalOpen(false);
                        fetchData();
                    }}
                    datosSeleccionados={datosSeleccionados}
                    IdProductSelect={datosSeleccionados.IdProdServOK}

                    selectedId={selectedId}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteArchivo
                    open={isDeleteModalOpen}
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        fetchData();
                    }}
                    // dataRow={dataRow} // Pasa la fila seleccionada al modal
                    IdPresentaSelect={selectedId} //id de presentacion
                    IdProductSelect={datosSeleccionados.IdProdServOK}
                    selectedData={dataRow}
                    idChin={dataRow?.IdArchivoOK} // Asegúrate de usar dataRow en lugar de rowData
                    {...console.log(dataRow)}
                />
            )}
            {isPutModalOpen && (
                <AchivoPutPresntacion
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
                    idChin={dataRow?.IdArchivoOK} // Asegúrate de usar dataRow en lugar de rowData
                />
            )}


            {/* Mostrar el ID de la presentación seleccionada */}
            {selectedId && <p>ID de la Presentación seleccionada: {selectedId}</p>}
        </Box>
    );
};

export default PresentacionesTable;
