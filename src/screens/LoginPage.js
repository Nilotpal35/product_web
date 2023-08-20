import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  json,
} from "react-router-dom";
import classes from "../styles/central.module.css";
import { useState } from "react";
import axios from "axios";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  if (actionData && actionData?.status === 201) {
    setTimeout(() => {
      navigate("/admin/product");
    }, 1000);
  }

  const emailValidation = true;
  // form.email.trim().includes("@");
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
      {actionData && (
        <h2
          className={classes.title}
          style={
            actionData.status === 201 ? { color: "green" } : { color: "red" }
          }
        >
          {actionData.message}
        </h2>
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
  const formData = Object.fromEntries(loginForm);
  const uri = process.env.REACT_APP_BACKEND_URI + "login";
  try {
    const response = await axios.post(uri, formData, {
      method: request.method,
    });
    console.log("RESPONSE FROM LOGIN ", response.data?.message);
    await new Promise((res) => setTimeout(res, 1000));
    return {
      message: response.data?.message,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    if (error?.response) {
      return {
        message: error?.response?.data?.message,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
      };
    } else {
      throw json(error?.message, { status: 400 });
    }
  }
}
