import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  json,
} from "react-router-dom";
import classes from "../styles/central.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LoginForm from "../components/LoginForm";
import { greenSignals } from "../util/Signal";
import Toaster from "../components/Toaster";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  console.log("action data", actionData);

  useEffect(() => {
    if (actionData && greenSignals.includes(actionData.status)) {
      setTimeout(() => {
        navigate("/admin/product");
      }, 1000);
    }
  }, [actionData]);

  const emailValidation = form.email.trim().includes("@");
  const passwordValidation = form.password.length > 0;
  const formValidation = emailValidation && passwordValidation;

  const props = {
    form: form,
    setForm: setForm,
    classes: classes,
    navigation: navigation,
    formValidation: formValidation,
  };

  return (
    <>
      {actionData && actionData.message && (
        <Toaster message={actionData?.message} status={actionData?.status} />
      )}
      <div className={classes.main_div_login}>
        <h2 className={classes.title}>Login Page</h2>
        <LoginForm {...props} />
      </div>
    </>
  );
}

export async function action({ request, params }) {
  const loginForm = await request.formData();
  const { email, password } = Object.fromEntries(loginForm);
  const uri = process.env.REACT_APP_BACKEND_URI + "graphql";
  console.log("email password", email, password);
  const query = `
  query postLogin($input : postLoginForm) {
    postLogin(input : $input) {
    status
    message
    userName
    userToken
    token
    }
  }`;

  const graphqlQuery = {
    query,
    variables: {
      input: {
        email,
        password,
      },
    },
  };
  try {
    const response = await axios.post(uri, graphqlQuery);
    const { errors, data } = response.data;
    if (errors) {
      let errorMessage = "";
      errors.map((item) => {
        errorMessage += "-> " + item.message;
      });
      return {
        message: errorMessage,
        status: 400,
        statusText: "error with login data",
      };
    } else {
      const { status, message, userName, userToken, token } =
        response?.data?.data?.postLogin;
      console.log("response data", response?.data?.data?.postLogin);
      localStorage.setItem("JWT:TOKEN", token);
      localStorage.setItem("PU:TOKEN", userToken);
      localStorage.setItem("PU:USER", userName);
      return {
        message: "login Successfull",
        status: response.status,
        statusText: response.statusText,
      };
    }
  } catch (error) {
    console.log("error in axios", error);
    let errorMessage = "";
    if (error?.response?.data?.errors) {
      error?.response?.data?.errors.map((item) => {
        errorMessage += "-> " + item.message;
      });
    }
    return {
      message: error?.response?.data?.message || errorMessage,
      status: error?.response?.status,
      statusText: error?.response?.statusText,
    };
  }
  // try {
  //   const response = await axios.post(uri, formData, {
  //     method: request.method,
  //   });
  //   console.log("RESPONSE FROM LOGIN ", response.data);
  //   localStorage.setItem("PU:TOKEN", response.data?.userToken);
  //   localStorage.setItem("JWT:TOKEN", response.data?.token);
  //   localStorage.setItem("PU:USER", response.data?.userName);

  //   await new Promise((res) => setTimeout(res, 1000));
  //   return {
  //     message: response.data?.message,
  //     status: response.status,
  //     statusText: response.statusText,
  //   };
  // } catch (error) {
  //   if (error?.response) {
  //     return {
  //       message: error?.response?.data?.message && "wrong email or password!",
  //       status: error?.response?.status,
  //       statusText: error?.response?.statusText,
  //     };
  //   } else {
  //     throw json(error?.message, { status: 400 });
  //   }
  // }
}
