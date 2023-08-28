import {
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
import SignUpForm from "../components/SignUpForm";

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
    cnfPassword: "",
  });
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData && greenSignals.includes(actionData.status)) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, [actionData]);

  const nameValidation = form.name.trim().length > 3;
  const dobValidation =
    !!form.dob.length > 0 && new Date(form.dob).toISOString();
  const emailValidation = form.email.trim().includes("@");
  const passwordValidation = form.password.length > 0;
  const cnfPasswordValidation =
    form.cnfPassword.length > 0 && form.cnfPassword === form.password;
  const formValidation =
    emailValidation &&
    passwordValidation &&
    nameValidation &&
    cnfPasswordValidation &&
    dobValidation;

  const props = {
    form,
    setForm,
    classes,
    navigation,
    formValidation,
    nameValidation,
    emailValidation,
    passwordValidation,
    cnfPasswordValidation,
    dobValidation,
  };

  return (
    <>
      {actionData && (
        <h2
          className={classes.title}
          style={
            greenSignals.includes(actionData.status)
              ? { color: "green" }
              : { color: "red" }
          }
        >
          {actionData.message}
        </h2>
      )}
      <div className={classes.main_div_login}>
        <h2 className={classes.title}>SignUp Page</h2>
        <SignUpForm {...props} />
      </div>
    </>
  );
}

export async function action({ request, params }) {
  const loginForm = await request.formData();
  const formData = Object.fromEntries(loginForm);
  console.log("SIGN UP FORM DATA", formData);
  const uri = process.env.REACT_APP_BACKEND_URI + "signup";
  try {
    const response = await axios.post(uri, formData, {
      method: request.method,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
      },
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
  //   return {
  //     message: "error?.response?.data?.message",
  //     status: 500,
  //     statusText: "error?.response?.statusText",
  //   };
}
