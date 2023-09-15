import React, { Profiler } from "react";
import styled from "styled-components";
import Login from "./screens/Login";
import LoginPage from "./screens/LoginPage";
import Logout from "./screens/Logout";
import { createBrowserRouter, json, RouterProvider } from "react-router-dom";
import { loader as productLoader } from "./screens/ProductHome";
import { loader as addProductLoader } from "./screens/AddProduct";
import { loader as cartLoader, action as cartAction } from "./screens/Cart";
import { loader as getOrderLoader } from "./screens/Order";
import { loader as editProductLoader } from "./screens/EditProduct";
import { action as LoginAction } from "./screens/LoginPage";
import { action as formAction } from "./components/AddEditProductForm";
import SignUpPage, { action as signUpAction } from "./screens/SignUpPage";
import { onRenderCallBack } from "./util/onRenderCallback";
import { decodeTokenLoader, getAuthToken } from "./util/auth";

const ProductHome = React.lazy(() => import("./screens/ProductHome"));

const MainNavigation = React.lazy(() => import("./screens/MainNavigation"));

const EditProduct = React.lazy(() => import("./screens/EditProduct"));

const Home = React.lazy(() => import("./screens/Home"));

const Order = React.lazy(() => import("./screens/Order"));

const Cart = React.lazy(() => import("./screens/Cart"));

const AddProduct = React.lazy(() => import("./screens/AddProduct"));

const ErrorPage = React.lazy(() => import("./screens/Error"));

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
    path: "/",
    errorElement: SuspenceComponent(<ErrorPage />),
    id: "root",
    loader: getAuthToken,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <LoginPage />,
        action: (meta) => LoginAction(meta),
      },
      {
        path: "signUp",
        element: <SignUpPage />,
        action: (meta) => signUpAction(meta),
      },
      { path: "logout", element: <Logout /> },
      {
        path: "admin",
        errorElement: SuspenceComponent(<ErrorPage />),
        element: SuspenceComponent(<MainNavigation />),
        id: "main",
        loader: decodeTokenLoader,
        children: [
          { index: true, element: SuspenceComponent(<Home />) },
          {
            path: "product",
            element: SuspenceComponent(
              <Profiler id="profile" onRender={onRenderCallBack}>
                <ProductHome />
              </Profiler>
            ),
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
