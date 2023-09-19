import axios from "axios";
export const URI = process.env.REACT_APP_BACKEND_URI + "graphql";

export async function addCartItems({ prodId, authToken }) {
  const query = `
        mutation postAddCart($input : postAddCartForm) {
          postAddCart(input : $input){
            message
            status
          }
        }
      `;
  const graphqlQuery = {
    query,
    variables: {
      input: {
        userId: localStorage.getItem("PU:TOKEN"),
        prodId,
      },
    },
  };

  try {
    const response = await axios.post(URI, graphqlQuery, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    });
    const { errors, data } = response.data;
    return {
      message: data.postAddCart.message || "successfully added",
      status: data.postAddCart.status || 200,
    };
  } catch (error) {
    return {
      message: "some error happend in addin cart items",
      status: 401,
    };
  }
}

