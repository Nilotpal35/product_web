import { useActionData, useNavigate, useNavigation } from "react-router-dom";
import classes from "../styles/central.module.css";
import { useEffect, useState } from "react";
import { greenSignals } from "../util/Signal";
import SignUpForm from "../components/SignUpForm";
import Toaster from "../components/Toaster";
import { getSignUp } from "../graphql/query";

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
  const { message, status, statusText } = await getSignUp(formData);
  return { message, status, statusText };
}
