import {Box, Tabs, Tab} from "@mui/material";
import React, {useState} from "react";

const productsTabs = ["Productos", "Estatus", "Presentaciones", "Negocios", "Informacion Adicional"];

const ProductsNavTab = ({setCurrentRowInProductsTab, setCurrentNameTabInPrincipalTab,isSelected}) => {

    const [currenTabIndex, setCurrentTabIndex] = useState(0);
    const handleChange = (e) => {

        setCurrentNameTabInPrincipalTab(e.target.innerText.toUpperCase());

        switch (e.target.innerText.toUpperCase()) {
            case "PRODUCTOS":
                setCurrentTabIndex(0);
                break;
            case "ESTATUS":
                setCurrentTabIndex(1);
                break;
            case "PRESENTACIONES":
                setCurrentTabIndex(2);
                break;
            case "NEGOCIOS":
                setCurrentTabIndex(3);
                break;
            case "INFORMACION ADICIONAL":
                setCurrentTabIndex(4);
                break;
        }

    };

    return (
        <Box sx={{border: (theme) => `2px solid ${theme.palette.divider}`, mx: 1, padding: 0.5}}>
            <Tabs
                value={currenTabIndex}
                variant={"fullWidth"}
                onChange={handleChange}
                aria-label="icon tabs example"
                textColor="primary"
            >
                {productsTabs.map((tab) => {
                    return <Tab key={tab} label={tab} disabled={isSelected}/>;
                })}
            </Tabs>
        </Box>
    );
};
export default ProductsNavTab ;