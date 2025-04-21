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
import { getPresentaciones } from "../../../services/remote/get/Presentaciones/getPresentaciones";
import AddPresentacionModal from "../../modales/Presentaciones/AddPresentacion";
import AddPresentacionPUT from "../../modales/Presentaciones/AddPresentacionPUT";
import DeletePresentacion from "../../modales/Presentaciones/DeletePresentacion";

// Columnas de la tabla
const columnas = [
    {
        accessorKey: "IdPresentaOK",
        header: "ID Presentación",
        size: 30,
    },
    {
        accessorKey: "DesPresenta",
        header: "Descripción",
        size: 150,
    },
    {
        accessorKey: "Indice",
        header: "Categoría",
        size: 100,
    },
    {
        accessorKey: "CodigoBarras",
        header: "Código de Barras",
        size: 100,
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

const PresentacionesTable = ({ datosSeleccionados, setDatosSeleccionados, setSelectedId }) => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [productsData, setProductsData] = useState([]);
    const [dataRow, setDataRow] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Estado para el modal de agregar
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para el modal de eliminar
    const [isPutModalOpen, setIsPutModalOpen] = useState(false); // Estado para el modal
    const [IdPresentaSelect, setIdPresentaSelect] = useState(null);
    const [IdProductSelect, setIdProductSelect] = useState(null);

    // Función para manejar la selección de una fila
    const sendDataRow = (rowData) => {
        setDataRow(rowData.original); // Guarda la fila seleccionada
        setSelectedId(rowData.original.IdPresentaOK); // Guarda el ID de la presentación seleccionada
        setIdPresentaSelect(rowData.original.IdPresentaOK);
        console.log(IdPresentaSelect + 'Presentacion');
    };
    // Funciones para abrir y cerrar los modales
    const openAddModal = () => setIsAddModalOpen(true);

    const openDeleteModal = () => {
        if (!IdPresentaSelect) {
            console.error("No se ha seleccionado un ID.");
            console.log(IdPresentaSelect);
            return;
        }
        setIsDeleteModalOpen(true);
    }

    const openPUTModal = () => {
        if (!IdPresentaSelect) {
            console.error("No se ha seleccionado un ID.");
            console.log(IdPresentaSelect);
            return;
        }
        setIsPutModalOpen(true);
    }

    // Función para obtener los datos de las presentaciones
    async function fetchData() {
        try {
            const {IdProdServOK, IdProdServBK } = datosSeleccionados;

            // Verificar que los ID's estén correctamente seleccionados
            if (IdProdServOK === "0" || IdProdServBK === "0") {
                setLoadingTable(false);
                return;
            }

            // Obtener los datos de las presentaciones
            const productsData = await getPresentaciones(IdProdServOK);
            setProductsData(productsData || []); // Asigna directamente los datos
            setLoadingTable(false);

        } catch (error) {
            console.error("Error al obtener las presentaciones: ", error);
            setLoadingTable(false);
        }
    }

    // Llama a fetchData cada vez que cambian los datos seleccionados
    useEffect(() => {
        fetchData();
        setIdProductSelect(datosSeleccionados.IdProdServOK);

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
                          {/*   <Tooltip title="Detalles">
                                <IconButton>
                                    <InfoIcon />
                                </IconButton>
                            </Tooltip> */}
                            <Tooltip title="Refrescar">
                                <IconButton onClick={fetchData}>
                                    <RefreshIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Stack>
                )}
            />

            {/* Modal para agregar presentación */}
            {isAddModalOpen && (
                <AddPresentacionModal
                    open={isAddModalOpen}
                    onClose={() => {
                        setIsAddModalOpen(false);
                        fetchData();
                    }}
                    datosSeleccionados={datosSeleccionados}
                    IdProductSelect={IdProductSelect}
                />
            )}

            {/* Modal para eliminar presentación */}
            {isDeleteModalOpen && (
                <DeletePresentacion
                    open={isDeleteModalOpen}
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        fetchData();
                    }}
                    selectedData={dataRow} // Pasa la fila seleccionada al modal
                    IdPresentaSelect={IdPresentaSelect} //id de presentacion
                    IdProductSelect={IdProductSelect}
                />
            )}

            {isPutModalOpen && (
                <AddPresentacionPUT
                    open={isPutModalOpen}
                    onClose={() => {
                        setIsPutModalOpen(false);
                        fetchData();
                    }}
                    selectedData={dataRow} // Pasa la fila seleccionada al modal
                    IdPresentaSelect={IdPresentaSelect} //id de presentacion
                    IdProductSelect={IdProductSelect}
                />
            )}
        </Box>
    );
};

export default PresentacionesTable;
