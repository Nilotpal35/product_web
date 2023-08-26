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

export default function AddEditProductForm({ formData, setFormData, action }) {
  console.log("Action", action);
  const actionData = useActionData();
  console.log("Action data", actionData);

  const navigation = useNavigation();
  const titleValidation = formData?.title.length > 4;
  const descriptionValidation = formData.description.length > 5;
  const priceValidation = formData.price > 5 && formData.price < 99999;

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
          >
            <input type="hidden" name="_id" value={formData?._id || ""} />
            <label>TITLE</label>
            <input
              type="text"
              placeholder="title"
              name="title"
              className={classes.titleInput}
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
            <label>IMAGE</label>
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
            <label>PRICE</label>
            <input
              className={classes.titleInput}
              min={1}
              max={99999}
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
            <label>DESCRIPTION</label>
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
  const userToken = localStorage.getItem("PU:TOKEN");
  if (!userToken) {
    return redirect("/login");
  }
  const form = await request.formData();
  const formData = Object.fromEntries(form);

  console.log("Edit product FORM DATA IN ACTION", formData);

  const uri =
    process.env.REACT_APP_BACKEND_URI +
    (formData._id ? "admin/edit-product" : "admin/add-product");
  console.log("URI", uri);

  try {
    const response = await axios.post(uri, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("RESPONSE DATA", response?.data);
    //await new Promise((res) => setTimeout(res, 1000));
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

  // return "hello";
}
