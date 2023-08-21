import classes from "../styles/central.module.css";
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import LoadingScreen from "./LodingScreen";
import axios from "axios";

export default function AddEditProductForm({
  formHandler,
  formData,
  setFormData,
  action,
}) {
  console.log("Action", action);
  const actionData = useActionData();
  console.log("Action data", actionData);

  const navigation = useNavigation();
  const titleValidation = formData?.title.length > 4;
  const descriptionValidation = formData.description.length > 5;
  const priceValidation = formData.price > 5;

  const validationResult =
    titleValidation && descriptionValidation && priceValidation;

  return (
    <>
      {navigation.state === "submitting" ? (
        <LoadingScreen fallbackText={"Submitting"} />
      ) : (
        <div className={classes.main_div}>
          <Form
            className={classes.form}
            method="POST"
            encType="multipart/form-data"
            onSubmit={formHandler}
          >
            <input type="hidden" name="_id" value={formData?._id || ""} />
            <label>Title</label>
            <input
              type="text"
              placeholder="title"
              name="title"
              value={formData.title}
              onChange={(e) => {
                setFormData((prevData) => {
                  return { ...prevData, title: e.target.value };
                });
              }}
              style={
                titleValidation
                  ? { border: "1px solid green" }
                  : { border: "2px solid red" }
              }
            />
            <label>ImageUrl</label>
            <input
              type="file"
              name="imageUrl"
              placeholder="paste image link here"
              // value={formData.imageUrl}
              onChange={(e) => {
                setFormData((prevData) => {
                  return { ...prevData, imageUrl: e.target.files[0] };
                });
              }}
            />
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder="price"
              step={0.1}
              value={formData.price}
              onChange={(e) => {
                setFormData((prevData) => {
                  return { ...prevData, price: e.target.value };
                });
              }}
              style={
                priceValidation
                  ? { border: "1px solid yellow" }
                  : { border: "2px solid red" }
              }
            />
            <label>Description</label>
            <textarea
              rows={5}
              cols={5}
              name="description"
              value={formData.description}
              placeholder="description"
              onChange={(e) => {
                setFormData((prevData) => {
                  return { ...prevData, description: e.target.value };
                });
              }}
              style={
                descriptionValidation
                  ? { border: "1px solid yellow" }
                  : { border: "2px solid red" }
              }
            />
            <div className={classes.button_ctr}>
              <button type="submit" disabled={!validationResult}>
                {navigation.state === "submitting" ? "Submitting..." : "Submit"}
              </button>
              <button type="reset">Reset</button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}

export async function action({ request, params }) {
  const form = await request.formData();
  const formData = Object.fromEntries(form);

  console.log("Edit product FORM DATA IN ACTION", formData);

  const uri = process.env.REACT_APP_BACKEND_URI + action;

  // try {
  //   const response = await axios.post(uri, formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  //   console.log("RESPONSE DATA", response?.data);
  //   await new Promise((res) => setTimeout(res, 1000));

  //   return redirect("/admin/product");
  // } catch (err) {
  //   // throw json({message : err.response.data.error}, {status : err.response.data.status, statusText
  //   //  : err.response.data.statusText})
  //   //console.log("ERROR IN AXIOS", err.response.data.message);
  //   //return err?.response.data.error;
  //   if (err?.response.status === 401) {
  //     throw json(err?.response.data.message, { status: err?.response.status });
  //   } else {
  //     return err?.response.data.message;
  //   }
  // }
  return "hello";
  // fetch("http://localhost:8080/fileUpload", {
  //   method: request.method,
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   body: formData,
  // })
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((res) => {
  //     console.log("RESPONSE IN FETCH", res);
  //   })
  //   .catch((err) => {
  //     console.log("ERROR IN FETCH", err.message);
  //   });
  // return "hello";
}
