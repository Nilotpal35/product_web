import { useActionData, useNavigate, useNavigation } from "react-router-dom";
import classes from "../styles/central.module.css";
import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import { greenSignals } from "../util/Signal";
import Toaster from "../components/Toaster";
import { loginAction } from "../graphql/query";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();

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
  console.log("email password", email, password);
  const { message, status, userName, userToken, token } = await loginAction({
    email,
    password,
  });
  if (greenSignals.includes(status) && token && userName && userToken) {
    localStorage.setItem("JWT:TOKEN", token);
    localStorage.setItem("expiration", Date.now() + 1 * 60 * 60 * 1000);
    localStorage.setItem("PU:TOKEN", userToken);
    localStorage.setItem("PU:USER", userName);
  }
  return { message, status };
}
