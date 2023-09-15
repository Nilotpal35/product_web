import axios from "axios";

export async function addCartItems({ prodId, authToken }) {
  console.log("add cart item mutation is triggering --1 ");

  const URI = process.env.REACT_APP_BACKEND_URI + "graphql";

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
    console.log("RESPONSE DATA IN ADD CART", data);
    console.log("RESPONSE ERROR IN ADD CART", errors);
    return {
      message: data.postAddCart.message || "successfully added",
      status: data.postAddCart.status || 200,
    };
  } catch (error) {
    console.log("ERROR IN ADD CART HANDLER MUTATION", error);
    return {
      message: "some error happend in addin cart items",
      status: 401,
    };
  }
}
