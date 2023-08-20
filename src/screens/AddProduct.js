import { json, useActionData } from "react-router-dom";
import classes from "../styles/central.module.css";
import { useState } from "react";
import axios from "axios";
import AddEditProductForm from "../components/AddEditProductForm";

export default function AddProduct() {
  const actionData = useActionData();
  console.log("ACTION DATA in add product", actionData);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    imageUrl: "",
    description: "",
  });

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

  const formData = Object.fromEntries(form);

  console.log("Add product FORM DATA IN ACTION", formData, request.method);

  const uri = process.env.REACT_APP_BACKEND_URI + "admin/add-product";
  console.log("ADD PRODUCT URI", uri);
  try {
    const response = await axios.post(uri, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    console.log("RESPONSE DATA", response?.data);
    await new Promise((res) => setTimeout(res, 1000));

    //return redirect("/admin/product");
  } catch (err) {
    // throw json({message : err.response.data.error}, {status : err.response.data.status, statusText
    //  : err.response.data.statusText})
    //console.log("ERROR IN AXIOS", err.response.data.message);
    //return err?.response.data.error;
    if (err?.response.status === 401) {
      throw json(err?.response.data.message, { status: err?.response.status });
    } else {
      return err?.response.data.message;
    }
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
