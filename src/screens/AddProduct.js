import { json, redirect, useActionData } from "react-router-dom";
import classes from "../styles/central.module.css";
import { useState } from "react";
import axios from "axios";
import AddEditProductForm from "../components/AddEditProductForm";

export default function AddProduct() {
  const actionData = useActionData();
  console.log("ACTION DATA", actionData);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    imageUrl: "",
    description: "",
  });

  // function formHandler(event) {
  //   event.preventDefault();
  //   console.log("FORM DATA ->", formData);
  //   submit(formData, { method: "POST", encType: "multipart/form-data" , });
  //   //setSentData(true);
  // }

  const props = {
    formData: formData,
    setFormData: setFormData,
    //formHandler: formHandler,
    action: `/admin/add-product`,
  };
  return (
    <>
      {actionData && <h2 className={classes.error}>{actionData}</h2>}
      <h2 className={classes.title}>Add Product</h2>
      <AddEditProductForm {...props} />
    </>
  );
}

export async function action({ request, params }) {
  const form = await request.formData();
  // const formData = {
  //   title: form.get("title"),
  //   imageUrl: form.get("imageUrl"),
  //   price: form.get("price"),
  //   description: form.get("description"),
  // };

  const formData = Object.fromEntries(form);

  console.log("Add product FORM DATA IN ACTION", formData, request.method);
  try {
    const { data } = await axios.post(
      "http://localhost:8080/add-product",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("RESPONSE DATA", data);
    await new Promise((res) => setTimeout(res, 1000));
    return redirect("/admin/product");
  } catch (err) {
    // throw json({message : err.response.data.error}, {status : err.response.data.status, statusText
    //  : err.response.data.statusText})
    // console.log("ERROR IN AXIOS", err.response.data.error);
    return err?.response.data.error;
  }
}

//-------------------------//
// const [sentData, setSentData] = useState(false);
//common way to send data into backend
// useEffect(() => {
//   if (sentData) {
//     async function sendData() {
//       try {
//         const { data } = await axios.post(
//           "http://localhost:8080/fileUpload",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         console.log("RESPONSE DATA", data);
//       } catch (error) {
//         console.log("Error in axios", error.message);
//       }
//     }
//     sendData();
//   }
// }, [sentData]);
