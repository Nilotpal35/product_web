import styled from "styled-components";
import { createBrowserRouter, json, RouterProvider } from "react-router-dom";
import ProductHome, { loader as productLoader } from "./screens/ProductHome";
import Login from "./screens/Login";
import ErrorPage from "./screens/Error";
import AddProduct, { loader as addProductLoader } from "./screens/AddProduct";
import Cart, {
  loader as cartLoader,
  action as cartAction,
} from "./screens/Cart";
import Order from "./screens/Order";
// import ProductDetail, { loader as DetailLoader } from "./screens/ProductDetail";
import MainNavigation from "./screens/MainNavigation";
import Home from "./screens/Home";
import EditProduct, {
  // loader as EditProductLoader,
  action as EditFormAction,
} from "./screens/EditProduct";
import LoginPage, { action as LoginAction } from "./screens/LoginPage";
import { action as formAction } from "./components/AddEditProductForm";
import SignUpPage, { action as signUpAction } from "./screens/SignUpPage";
import LogOut from "./screens/Logout";

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
        loader: productLoader,
      },
      {
        path: "add-product",
        element: <AddProduct />,
        action: formAction,
        loader: addProductLoader,
      },

      {
        path: "edit-product",
        element: <EditProduct />,
        action: formAction,
      },
      {
        path: "cart",
        element: <Cart />,
        loader: cartLoader,
        action: cartAction,
      },
      { path: "order", element: <Order /> },
    ],
  },
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      { path: "login", element: <LoginPage />, action: LoginAction },
      { path: "signUp", element: <SignUpPage />, action: signUpAction },
      { path: "logout", element: <LogOut /> },
    ],
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
