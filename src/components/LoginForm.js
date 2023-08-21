import { Form, Link } from "react-router-dom";

export default function LoginForm({
  form,
  setForm,
  formValidation,
  classes,
  navigation,
}) {
  return (
    <Form className={classes.form} method="POST">
      <label>Email</label>
      <input
        type="text"
        name="email"
        placeholder="email"
        value={form.email}
        onChange={(e) => {
          setForm((prev) => {
            return { ...prev, email: e.target.value };
          });
        }}
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
      <button type="submit" disabled={!formValidation}>
        {navigation.state === "submitting" ? "Logging in..." : "Login"}
      </button>
      <Link to="#">Forgot Password?</Link>
      <Link to="/signUp">New User. SignUp</Link>
    </Form>
  );
}
