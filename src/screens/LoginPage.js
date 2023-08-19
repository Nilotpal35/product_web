import { Form, Link, useActionData } from "react-router-dom";
import classes from "../styles/central.module.css";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const actionData = useActionData();
  console.log("login action data", actionData);

  return (
    <>
      {actionData && <h2 className={classes.title}>{actionData}</h2>}
      <div className={classes.main_div_login}>
        <h2 className={classes.title}>Login Page</h2>
        <Form className={classes.form} method="POST">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={form.email}
            onChange={(e) => {
              setForm((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={form.password}
            onChange={(e) => {
              setForm((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
            required
          />
          <button type="submit" className={classes.button_ctr}>
            Login
          </button>
          <Link to="#">Forgot Password?</Link>
          <Link to="#">New User. SignUp</Link>
        </Form>
      </div>
    </>
  );
}

export async function action({ request, params }) {
  const loginForm = await request.formData();
  const formData = Object.fromEntries(loginForm);
  console.log("LOGIN FORM DATA", formData);
  const uri = process.env.REACT_APP_BACKEND_URI + "login";
  console.log("URI", uri, request.method);
  try {
    const { data } = await axios.post(uri, formData, {
      method: request.method,
    });
    console.log("RESPONSE FROM LOGIN ", data?.message);
    return data?.message;
  } catch (error) {
    return error.response.data.message;
  }
}
