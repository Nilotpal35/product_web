import classes from "../styles/central.module.css";
import { Form } from "react-router-dom";

export default function AddEditProductForm({
  formHandler,
  formData,
  setFormData,
  action,
}) {
  return (
    <>
      <div className={classes.main_div}>
        <Form
          className={classes.form}
          method="POST"
          encType="multipart/form-data"
          action={action}
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
          />
          <label>ImageUrl</label>
          <input
            type="file"
            name="imageUrl"
            placeholder="paste image link here"
            //value={formData.imageUrl}
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
            min={0.1}
            value={formData.price}
            onChange={(e) => {
              setFormData((prevData) => {
                return { ...prevData, price: e.target.value };
              });
            }}
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
          />
          <div className={classes.button_ctr}>
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
        </Form>
      </div>
    </>
  );
}
