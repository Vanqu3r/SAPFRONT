import {useEffect, useState,useRef} from "react";


import {MaterialReactTable} from 'material-react-table';
import {Box, Stack, Tooltip, IconButton, Dialog} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
    showMensajeConfirm, showMensajeError,showMensajeExito } from "../../../../share/components/messages/MySwalAlerts.jsx";
import {getAllProducts} from "../../services/remote/get/getAllProducts";

import AddProduct  from "../modales/productos/addProduct";
import UpdateProduct from "../modales/productos/updateProduct";
import DetalleProducto from "../modales/productos/detalleProducto.jsx";
import {DeleteProduct } from "../../services/remote/del/delProducto.jsx"


const columns = [
    {
        accessorKey: "COMPANYID",
        header: "COMPANYID",
        size: 30, 
    },
    {
        accessorKey: "CEDIID",
        header: "CEDIID",
        size: 30, 
    },
    {
        accessorKey: "LABELID",
        header: "LABELID",
        size: 150, 
    },
    {
        accessorKey: "LABEL",
        header: "LABEL",
        size: 30, 
    },
    {
        accessorKey: "INDEX",
        header: "INDEX",
        size: 150, 
    },
    {
        accessorKey: "COLLECTION",
        header: "ID OK COLLECTION",
        size: 30, 
    },
    {
        accessorKey: "SECTION",
        header: "SECTION",
        size: 30, 
    },
    {
        accessorKey: "SEQUENCE",
        header: "SEQUENCE",
        size: 30, 
    },
    {
        accessorKey: "IMAGE",
        header: "IMAGE",
        size: 30, 
    },
    {
        accessorKey: "DESCRIPTION",
        header: "DESCRIPTION",
        size: 30, 
    },

  ];
   



const ProductsTable = ({setDatosSeleccionados, datosSeleccionados}) => {
    
    const [loadingTable, setLoadingTable] = useState(true);   
    const [productsData, setProductsData] = useState([]); 
    const [AddProductShowModal, setAddProductShowModal] = useState(false);  
    const [DetalleProductShowModal, setDetalleProductShowModal] = useState(false);
    const [UpdateProductShowModal, setUpdateProductShowModal] = useState(false);
  
    const [dataRow, setDataRow] = useState();

    
    const sendDataRow = (rowData) => {
        if(dataRow && dataRow === rowData.original){     
            setDataRow(null); 
            setDatosSeleccionados({ IdProdServOK:"0"});
        }else{
            setDataRow(rowData.original);
            const { IdProdServOK} = rowData.original; 

            setDatosSeleccionados({ IdProdServOK});
        }
        
    };

    async function fetchData() {
        try {
          const response = await getAllProducts();
      
          if (response?.value) {
            setProductsData(response.value); // la api regresa muchas cosas, pero la informacion esta en values
          } else {
            console.warn("No se encontraron datos en 'value'", response);
            setProductsData([]);
          }
      
          setLoadingTable(false);
        } catch (error) {
          console.error("Error al obtener la data en useEffect: ", error);
          setProductsData([]);
          setLoadingTable(false);
        }
      }
      

   
   
   const handleDelete = async () => {
    const res = await showMensajeConfirm(
        `El siguiente producto: ${
            (dataRow.DesProdServ)
        } será eliminado, ¿Desea continuar?`
    );
    if (res) {
        try {
            let {IdProdServOK} = datosSeleccionados;
            
            
            await DeleteProduct (IdProdServOK);

            showMensajeExito("Producto eliminado con exito");
            fetchData();
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
                    columns={columns}
                    initialState={{density: "compact", showGlobalFilter: true}}
                    data={productsData}
                    state={{isLoading: loadingTable}}
                    enableColumnActions={false}
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
                                            onClick={() => setAddProductShowModal(true)}   
                                        >
                                            <AddCircleIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Editar">
                                    <IconButton
                                        onClick={() => {
                                            
                                                setUpdateProductShowModal(true);
                                            
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
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Detalles ">
                                    <IconButton
                                        onClick={() => {
                                            
                                            setDetalleProductShowModal(true);
                                            
                                        }}
                                        disabled={!dataRow} 
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
                <Dialog open={AddProductShowModal}>
                <AddProduct
                  AddProductShowModal={AddProductShowModal}
                  setAddProductShowModal={setAddProductShowModal}
                  onClose = {()=>{
                    setAddProductShowModal(false);
                    fetchData();
                  }
                }/>
              </Dialog>
              <Dialog open={UpdateProductShowModal}>
                    <UpdateProduct 
                        UpdateProductShowModal={UpdateProductShowModal}
                        setUpdateProductShowModal={setUpdateProductShowModal}
                        dataRow={dataRow}
                        onClose={() => {
                            setUpdateProductShowModal(false);
                            fetchData();
                        }}
                    />
                </Dialog>
                <Dialog open={DetalleProductShowModal}>
                    <DetalleProducto
                        DetalleProductShowModal={DetalleProductShowModal}
                        setDetalleProductShowModal ={ setDetalleProductShowModal }
                        dataRow={dataRow}
                        onClose={() => {
                            setDetalleProductShowModal(false);
                        }}
                    />
                </Dialog>
            </Box>
        </Box>
    );
};

export default ProductsTable;