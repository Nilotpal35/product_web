import React from "react";
import styled from "styled-components";
import { createBrowserRouter, json, RouterProvider } from "react-router-dom";
import { loader as productLoader } from "./screens/ProductHome";
// import Login from "./screens/Login";
// import ErrorPage from "./screens/Error";
import { loader as addProductLoader } from "./screens/AddProduct";
import { loader as cartLoader, action as cartAction } from "./screens/Cart";
import { loader as getOrderLoader } from "./screens/Order";
// import ProductDetail, { loader as DetailLoader } from "./screens/ProductDetail";
// import MainNavigation from "./screens/MainNavigation";
// import Home from "./screens/Home";
import { loader as editProductLoader } from "./screens/EditProduct";
import { action as LoginAction } from "./screens/LoginPage";
import { action as formAction } from "./components/AddEditProductForm";
import { action as signUpAction } from "./screens/SignUpPage";
// import LogOut from "./screens/Logout";

const ProductHome = React.lazy(() => import("./screens/ProductHome"));

const MainNavigation = React.lazy(() => import("./screens/MainNavigation"));

const LoginPage = React.lazy(() => import("./screens/LoginPage"));

const LogOut = React.lazy(() => import("./screens/Logout"));

const SignUpPage = React.lazy(() => import("./screens/SignUpPage"));

const EditProduct = React.lazy(() => import("./screens/EditProduct"));

const Home = React.lazy(() => import("./screens/Home"));

const Order = React.lazy(() => import("./screens/Order"));

const Cart = React.lazy(() => import("./screens/Cart"));

const AddProduct = React.lazy(() => import("./screens/AddProduct"));

const ErrorPage = React.lazy(() => import("./screens/Error"));

const Login = React.lazy(() => import("./screens/Login"));

export function SuspenceComponent(component, fallback) {
  return (
    <React.Suspense
      fallback={
        <p style={{ color: "black" }}>
          <i>{fallback || "Loading..."}</i>
        </p>
      }
    >
      {component}
    </React.Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: "/admin",
    errorElement: SuspenceComponent(<ErrorPage />),
    element: SuspenceComponent(<MainNavigation />),
    children: [
      { index: true, element: SuspenceComponent(<Home />) },
      {
        path: "product",
        element: SuspenceComponent(<ProductHome />),
        loader: (meta) => productLoader(meta),
      },
      {
        path: "add-product",
        element: SuspenceComponent(<AddProduct />),
        action: (meta) => formAction(meta),
        loader: (meta) => addProductLoader(meta),
      },

      {
        path: "edit-product",
        element: SuspenceComponent(<EditProduct />),
        loader: (meta) => editProductLoader(meta),
        action: (meta) => formAction(meta),
      },
      {
        path: "cart",
        element: SuspenceComponent(<Cart />),
        loader: (meta) => cartLoader(meta),
        action: (meta) => cartAction(meta),
      },
      {
        path: "order",
        element: SuspenceComponent(<Order />),
        loader: (meta) => getOrderLoader(meta),
      },
    ],
  },
  {
    path: "/",
    errorElement: SuspenceComponent(<ErrorPage />),
    children: [
      {
        index: true,
        element: SuspenceComponent(<Login />),
      },
      {
        path: "login",
        element: SuspenceComponent(<LoginPage />),
        action: (meta) => LoginAction(meta),
      },
      {
        path: "signUp",
        element: SuspenceComponent(<SignUpPage />),
        action: (meta) => signUpAction(meta),
      },
      { path: "logout", element: SuspenceComponent(<LogOut />) },
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
