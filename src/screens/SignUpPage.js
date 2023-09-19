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
import Toaster from "../components/Toaster";

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
    cnfPassword: "",
  });
  const actionData = useActionData();
  console.log("action data in signup page", actionData);
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData && greenSignals.includes(actionData.status)) {
      setTimeout(() => {
        //actionData.message = ""
        navigate("/login");
      }, 1000);
    }
  }, [actionData, navigate]);

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
        <Toaster message={actionData?.message} status={actionData?.status} />
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
  const URI = process.env.REACT_APP_BACKEND_URI + "graphql";
  const query = `
    mutation postSignup($input : postSignupForm!){
      postSignup(input : $input) {
        message
      }
    }
  `;
  const graphqlQuery = {
    query,
    variables: {
      input: formData,
    },
  };
  try {
    const response = await axios.post(URI, graphqlQuery);
    console.log("RESPONSE FROM LOGIN ", response?.data);
    // await new Promise((res) => setTimeout(res, 1000));
    const { data } = response.data;
    return {
      message: data.postSignup?.message,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    if (error?.response) {
      return {
        message:
          error?.response?.data?.errors[0].message ||
          error.response?.data?.message,
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
