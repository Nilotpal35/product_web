import styled from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductHome from "./screens/ProductHome";
import Home from "./screens/Home";
import Login from "./screens/Login";
import ErrorPage from "./screens/Error";
import AddProduct from "./screens/AddProduct";
import Cart from "./screens/Cart";
import Order from "./screens/Order";

const router = createBrowserRouter([
  {
    path: "/admin",
    errorElement: <ErrorPage />,
    element: <Home />,
    children: [
      {
        path: "product",
        element: <ProductHome />,
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
