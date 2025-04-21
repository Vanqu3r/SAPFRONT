import {useEffect, useState} from "react";
//Material UI
import {MaterialReactTable} from 'material-react-table';
import {Box, Stack, Tooltip, IconButton, Dialog} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
// DB
import { getProduct } from "../../services/remote/get/getOneProduct";
import AddNegocio from "../modales/negocios/addNegocio";
import { DeleteOneNegocio } from "../../services/remote/delete/DeleteOneNegocio";
//Para el proceso de eliminar
import {
    showMensajeConfirm, 
    showMensajeError,
    showMensajeExito }from "../../../../share/components/messages/MySwalAlerts.jsx";

const columnas = [
    {
        accessorKey: "IdNegocioOK",
        header: "ID Negocio",
        size: 30, //small column
     },
    {
        accessorKey: "detail_row.Activo",
        header: "Activo",
        size: 30, //small column
    },
    {
        accessorKey: "detail_row.Borrado",
        header: "Eliminado",
        size: 30, //small column
    },
];

const NegociosTable = ({datosSeleccionados,setDatosSeleccionados}) => {
    // controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);
    // controlar el estado de la data.
    const [productsData, setProductsData] = useState([]);
    //Controlar el modal de agregar negocio
    const [AddNegocioShowModal,setAddNegocioShowModal] = useState(false);
    // Controlar la informacion seleccionada
    const [dataRow, setDataRow] = useState();

    const sendDataRow = (rowData) => {
        if(dataRow && dataRow===rowData.original){
            setDataRow(null);
        }else{
            setDataRow(rowData.original);
            //console.log('NegocioSeleccionado->',rowData.original);
        }
    };

    async function fetchData() {
        try {
            const {IdProdServOK} = datosSeleccionados;
            if (IdProdServOK === "0" ) {
                setLoadingTable(false);
                return;
            }
            // Obtener los datos
            const productsData = await getProduct(IdProdServOK);
            setProductsData(productsData.negocios);
            // Cambiar el estado del indicador (loading) a false.
            setLoadingTable(false);
        } catch (error) {
            console.error("Error al obtener la data en useEffect: ", error);
        }
    }

    const handleDelete = async () => {
        const res = await showMensajeConfirm(
            `El siguiente Negocio: ${
                (dataRow.IdNegocioOK)
            } será eliminado, ¿Desea continuar?`
        );
        if (res) {
            try {
                await DeleteOneNegocio(datosSeleccionados.IdProdServOK,dataRow.IdNegocioOK);
    
                showMensajeExito("Producto eliminado con exito");
                fetchData();
                setDataRow(null);
            } catch (e) {
                console.error("handleDelete", e);
                showMensajeError(`No se pudo Eliminar el producto`);
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
                    columns={columnas}
                    initialState={{density: "compact", showGlobalFilter: true}}
                    data={productsData}
                    state={{isLoading: loadingTable}}
                    enableMultiRowSelection={false}
                    enableRowSelection={true}
                    muiTableBodyRowProps={({row}) => ({
                        onClick: row.getToggleSelectedHandler(),
                        onClickCapture: () => sendDataRow(row),
                        sx: {cursor: 'pointer'},
                    })}
                    renderTopToolbarCustomActions={() => (
                        <>
                            {/* ------- BARRA DE ACCIONES ------ */}
                            <Stack direction="row" sx={{m: 1}}>
                                <Box>
                                    <Tooltip title="Agregar">
                                        <IconButton
                                            onClick={() => setAddNegocioShowModal(true)}
                                        >
                                            <AddCircleIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                        <IconButton
                                            onClick={() =>handleDelete()/* setDeleteNegocioShowModal(true) */}
                                            disabled={!dataRow}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Refrescar">
                                        <IconButton
                                            onClick={fetchData}>
                                            <RefreshIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Stack>
                            {/* ------- BARRA DE ACCIONES FIN ------ */}
                        </>
                    )}
                />
                {/* M O D A L E S */}
                 <Dialog open={AddNegocioShowModal}>
                    <AddNegocio 
                        AddNegocioShowModal={AddNegocioShowModal}
                        setAddNegocioShowModal={setAddNegocioShowModal}
                        datosSeleccionados={datosSeleccionados}
                        onClose={() => {
                            setAddNegocioShowModal(false);
                            fetchData();
                        }}
                        //fetchData={fetchData}
                    />
                </Dialog>
                
            </Box>
        </Box>
    );
};

export default NegociosTable;