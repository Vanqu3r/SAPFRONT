import {useEffect, useState} from "react";

//Material UI
import {MaterialReactTable} from 'material-react-table';
import {Box, Stack, Tooltip, IconButton, Dialog} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";

// DB
import UpdateEstatusModal from "../modales/estatus/UpdateEstatus";
import AddEstatusModal from "../modales/estatus/AddEstatus";
import DeleteEstatusModal from "../modales/estatus/DeleteEstatus";
import DetallesEstatusModal from "../modales/estatus/DetallesEstatus";
import { getProduct } from "../../services/remote/get/getOneProduct";
const columns = [
    {
        accessorKey: "IdTipoEstatusOK",
        header: "ID Tipo Estatus OK",
        size: 30, //small column
    },
    {
        accessorKey: "Actual",
        header: "Actual",
        size: 30, //small column
    },
    {
        accessorKey: "Observacion",
        header: "Observacion",
        size: 150, //small column
    },

];

// Table - FrontEnd.
const EstatusTable = ({setDatosSeleccionados, datosSeleccionados}) => {
    const [UpdateEstatusShowModal, setUpdateEstatusShowModal] = useState(false);
    const [AddEstatusShowModal, setAddEstatusShowModal] = useState(false);
    const [DeleteEstatusShowModal, setDeleteEstatusShowModal] = useState(false);
    const [DetallesEstatusShowModal, setDetallesEstatusShowModal] = useState(false);

    const [EstatusSel, setEstatusSel] = useState(null); // Producto seleccionado
    // controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);
    const [ProductSelec, setProductSel] = useState(true);
    // controlar el estado de la data.
    const [productsData, setProductsData] = useState([]);

    // Función para manejar el clic en una fila
    const sendDataRow = (rowData) => {
        // Guardar la informacion seleccionada
        setEstatusSel(rowData.original);
    };

    async function fetchData() {
        try {
            // Obtener los id's seleccionados
            const {IdProdServOK,} = datosSeleccionados;
            setProductSel(IdProdServOK);
            // Verificar si fueron seleccionados los id's; de lo contrario, no hacer nada.
            if (IdProdServOK === "0") {
                setLoadingTable(false);
                return;
            }

            // Obtener los datos
            const productsData = await getProduct(IdProdServOK);
            setProductsData(productsData.estatus);
            // Cambiar el estado del indicador (loading) a false.
            setLoadingTable(false);
        } catch (error) {
            console.error("Error al obtener la data en useEffect: ", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box>
            <Box>
                <MaterialReactTable
                    columns={columns}
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
                                        
                                            onClick={() => setAddEstatusShowModal(true)}
                                        >
                                            <AddCircleIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Editar">
                                        <IconButton
                                            onClick={() => {
                                                // Si no hay producto seleccionado, no hace nada
                                                if (!EstatusSel) {
                                                    alert("Por favor, selecciona un producto primero.");
                                                    return;
                                                }
                                                setUpdateEstatusShowModal(true)}}
                                                disabled={!EstatusSel}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                        <IconButton
                                            onClick={() => {
                                                // Si no hay producto seleccionado, no hace nada
                                                if (!EstatusSel) {
                                                    alert("Por favor, selecciona un producto primero.");
                                                    return;
                                                }
                                                setDeleteEstatusShowModal(true)}}
                                                disabled={!EstatusSel}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Detalles ">
                                        <IconButton
                                        
                                            onClick={()=>{
                                                // Si no hay producto seleccionado, no hace nada
                                                if (!EstatusSel) {
                                                    alert("Por favor, selecciona un producto primero.");
                                                    return;
                                                }
                                                setDetallesEstatusShowModal(true)}}
                                                disabled={!EstatusSel}
                                        >
                                            <InfoIcon/>
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
                {
                
                <Dialog open={UpdateEstatusShowModal}>
                <UpdateEstatusModal
                  IdProdServOK={ProductSelec}
                  UpdateEstatusShowModal={UpdateEstatusShowModal}
                  setUpdateEstatusShowModal={UpdateEstatusShowModal}
                  EstatusToUpdate={EstatusSel} // Pasa el producto seleccionado al modal
                  onClose={async () => {
                    setUpdateEstatusShowModal(false);
                    fetchData();
                  }}
                />
              </Dialog>
              }
                {
                    <Dialog open={AddEstatusShowModal}>
                    <AddEstatusModal
                      IdProdServOK={ProductSelec}
                      AddEstatusShowModal={AddEstatusShowModal}
                      setAddEstatusShowModal={AddEstatusShowModal}
                      EstatusToUpdate={EstatusSel} // Pasa el producto seleccionado al modal
                      onClose={async () => {
                        setAddEstatusShowModal(false);
                        fetchData();
                      }}
                    />
                  </Dialog>
                }
                {
                   <Dialog open={DeleteEstatusShowModal}>
                   <DeleteEstatusModal
                     IdProdServOK={ProductSelec}
                     DeleteEstatusShowModal={DeleteEstatusShowModal}
                     setDeleteEstatusShowModal={DeleteEstatusShowModal}
                     EstatusToUpdate={EstatusSel} // Pasa el producto seleccionado al modal
                     onClose={async () => {
                        fetchData();
                        setDeleteEstatusShowModal(false);
                        setEstatusSel(false);
                     }}
                   />
                 </Dialog> 
                }

{
                
                <Dialog open={DetallesEstatusShowModal}>
                <DetallesEstatusModal
                  IdProdServOK={ProductSelec}
                  DetallesEstatusShowModal={DetallesEstatusShowModal}
                  setDetallesEstatusShowModal={DetallesEstatusShowModal}
                  EstatusToUpdate={EstatusSel} // Pasa el producto seleccionado al modal
                  onClose={async () => {
                    fetchData();
                    setDetallesEstatusShowModal(false);
                    setEstatusSel(false);
                  }}
                />
              </Dialog>
              }
            </Box>
        </Box>
    );
};

export default EstatusTable;