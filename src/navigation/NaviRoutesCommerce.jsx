import {createBrowserRouter} from "react-router-dom";
import Home from "../ecommerce/home/pages/home.jsx";
import Products from "../ecommerce/products/pages/products.jsx";
import Prices from "../ecommerce/prices/pages/prices.jsx";
import Orders from "../ecommerce/orders/pages/orders.jsx";
import Payments from "../ecommerce/payments/pages/payments.jsx";
import Shippings from "../ecommerce/shippings/pages/shippings.jsx";
import Error from "../share/errors/pages/Error.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/products",
                element: <Products/>,
            },
            {
                path: "/prices",
                element: <Prices/>,
            },
            {
                path: "/orders",
                element: <Orders/>,
            },
            {
                path: "/payments",
                element: <Payments/>,
            },
            {
                path: "/shippings",
                element: <Shippings/>,
            },
        ],
    },
]);
export default router;