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
import { getPresentacionesInfo } from "../../../services/remote/get/Presentaciones/getPresentacionesInfo";
import AddInfoPresentacion from "../../modales/Presentaciones/addInfoPresentacion";
import DeleteInfo from "../../modales/Presentaciones/DeleteInfo";
import PutInfoPresentacion from "../../modales/Presentaciones/PutInfoPresentacion";
// Columnas de la tabla

const columnas = [
    {
        accessorKey: "IdEtiquetaOK", // Accede al campo 'IdEtiqueta'
        header: "IdEtiquetaOK",
        size: 200,
    },
    {
        accessorKey: "IdEtiqueta", // Accede al campo 'IdEtiqueta'
        header: "IdEtiqueta",
        size: 200,
    },
    {
        accessorKey: "IdTipoSeccionOK", // Accede al campo 'IdTipoSeccionOK'
        header: "IdTipoSeccionOK",
        size: 250,
    },
    {
        accessorKey: "Secuencia", // Accede al campo 'Secuencia'
        header: "Secuencia",
        size: 80,
    },
    {
        accessorKey: "Valor", // Accede al campo 'Valor'
        header: "Valor",
        size: 100,
    },
];


const PresentacionesTable = ({ datosSeleccionados, setDatosSeleccionados, selectedId }) => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [productsData, setProductsData] = useState([]);
    const [dataRow, setDataRow] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Estado para el modal de agregar
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para el modal de eliminar
    const [isPutModalOpen, setIsPutModalOpen] = useState(false); // Estado para el modal put

    const sendDataRow = (rowData) => {
        setDataRow(rowData.original); // Guarda la fila seleccionada
        console.log(rowData.original.IdEtiquetaOK)
        //setSelectedId(rowData.original.IdPresentaOK); // Guarda el ID de la presentación seleccionada

    };


    // Funciones para abrir y cerrar los modales
    const openAddModal = () => setIsAddModalOpen(true);
    //DELETE
    const openDeleteModal = () => {
        if (!dataRow?.IdEtiquetaOK) {
            console.error("No se ha seleccionado un ID.");
            return;
        }
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const openPUTModal = () => {
        if (!dataRow?.IdEtiquetaOK) {
            console.error("No se ha seleccionado un ID.");
            return;
        }
        setIsPutModalOpen(true);
    };
    const closePUTModal = () => setIsPutModalOpen(false);


    //const [selectedId, setSelectedId] = useState(null); // Estado para guardar el ID de la presentación

    // Función para manejar el clic en una fila


    async function fetchData() {
        try {
            const { IdProdServOK, IdProdServBK } = datosSeleccionados;

            // Verificar que los ID's estén correctamente seleccionados
            if (IdProdServOK === "0" || IdProdServBK === "0") {
                setLoadingTable(false);
                return;
            }

            // Obtener los datos de las presentaciones
            //MOVER EL DATO ESTATICO
            const productsData = await getPresentacionesInfo(IdProdServOK, selectedId);

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
                <AddInfoPresentacion
                    open={isAddModalOpen}
                    onClose={() => {
                        setIsAddModalOpen(false);
                        fetchData();
                    }}
                    datosSeleccionados={datosSeleccionados}
                    IdProductSelect={datosSeleccionados.IdProdServOK}
                    IdPresentaSelect={selectedId}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteInfo
                    open={isDeleteModalOpen}
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        fetchData();
                    }}
                    // dataRow={dataRow} // Pasa la fila seleccionada al modal
                    IdPresentaSelect={selectedId} //id de presentacion
                    IdProductSelect={datosSeleccionados.IdProdServOK}
                    selectedData={dataRow}
                    idChin={dataRow?.IdEtiquetaOK} // Asegúrate de usar dataRow en lugar de rowData
                />
            )}

            {isPutModalOpen && (
                <PutInfoPresentacion
                    open={isPutModalOpen}
                    onClose={() => {
                        setIsPutModalOpen(false);
                        fetchData();
                    }}
                    //dataRow={dataRow} // Pasa la fila seleccionada al modal
                    IdPresentaSelect={selectedId} //id de presentacion
                    IdProductSelect={datosSeleccionados.IdProdServOK}
                    idChin={dataRow?.IdEtiquetaOK} // Asegúrate de usar dataRow en lugar de rowData
                    dataRow={dataRow}
                />
            )}

            {/* Mostrar el ID de la presentación seleccionada */}
            {selectedId && <p>ID de la Presentación seleccionada: {selectedId}</p>}
        </Box>
    );
};

export default PresentacionesTable;
