import { Form, Link } from "react-router-dom";

export default function SignUpForm({
  form,
  setForm,
  formValidation,
  classes,
  navigation,
  nameValidation,
  emailValidation,
  passwordValidation,
  cnfPasswordValidation,
  dobValidation,
}) {
  return (
    <Form className={classes.form} method="POST">
      <label>Name</label>
      <input
        type="text"
        name="name"
        placeholder="name"
        value={form.name}
        onChange={(e) => {
          setForm((prev) => {
            return { ...prev, name: e.target.value };
          });
        }}
        style={
          nameValidation
            ? { border: "1px solid yellow" }
            : { border: "2px solid red" }
        }
        required
      />
      <label>DOB</label>
      <input
        type="date"
        name="dob"
        placeholder="DD/MM/YYYY"
        value={form.dob}
        onChange={(e) => {
          setForm((prev) => {
            return { ...prev, dob: e.target.value };
          });
        }}
        style={
          dobValidation
            ? { border: "1px solid yellow" }
            : { border: "2px solid red" }
        }
      />
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
        style={
          emailValidation
            ? { border: "1px solid yellow" }
            : { border: "2px solid red" }
        }
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
        style={
          passwordValidation
            ? { border: "1px solid yellow" }
            : { border: "2px solid red" }
        }
        required
      />
      <label>Password</label>
      <input
        type="password"
        name="cnfPassword"
        placeholder="password"
        value={form.cnfPassword}
        onChange={(e) => {
          setForm((prev) => {
            return { ...prev, cnfPassword: e.target.value };
          });
        }}
        style={
          cnfPasswordValidation
            ? { border: "1px solid yellow" }
            : { border: "2px solid red" }
        }
        required
      />
      <button type="submit" disabled={!formValidation}>
        {navigation.state === "submitting" ? "Singing Up..." : "SignUp"}
      </button>
      <Link to="/login">Go Back to login Page?</Link>
    </Form>
  );
}
