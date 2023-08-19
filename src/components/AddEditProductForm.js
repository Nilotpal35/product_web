import classes from "../styles/central.module.css";
import { Form, useNavigation } from "react-router-dom";
import LoadingScreen from "./LodingScreen";

export default function AddEditProductForm({
  formHandler,
  formData,
  setFormData,
  action,
}) {
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
            action={action}
            onSubmit={formHandler}
          >
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
