import styled from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductHome from "./screens/ProductHome";
import Login from "./screens/Login";
import ErrorPage from "./screens/Error";
import AddProduct from "./screens/AddProduct";
import Cart from "./screens/Cart";
import Order from "./screens/Order";
import ProductDetail, { loader as DetailLoader } from "./screens/ProductDetail";
import MainNavigation from "./screens/MainNavigation";
import Home from "./screens/Home";

const router = createBrowserRouter([
  {
    path: "/admin",
    errorElement: <ErrorPage />,
    element: <MainNavigation />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "product",
        element: <ProductHome />,
      },
      {
        path: "detail/:prodId",
        element: <ProductDetail />,
        loader: DetailLoader,
      },
      { path: "add-product", element: <AddProduct /> },
      { path: "cart", element: <Cart /> },
      { path: "order", element: <Order /> },
    ],
  },
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Login />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

const StyledDiv = styled.div`
  background-color: rgb(100, 150, 90);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
