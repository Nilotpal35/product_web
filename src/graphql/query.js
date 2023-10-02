import axios from "axios";
export const URI = process.env.REACT_APP_BACKEND_URI + "graphql";

export const loginAction = async ({ email, password }) => {
  const query = `
    query postLogin($input : postLoginForm) {
      postLogin(input : $input) {
      status
      message
      userName
      userToken
      token
      }
    }`;

  const graphqlQuery = {
    query,
    variables: {
      input: {
        email,
        password,
      },
    },
  };
  try {
    const response = await axios.post(URI, graphqlQuery);
    const { status, message, userName, userToken, token } =
      response?.data?.data?.postLogin;
    return {
      message,
      status,
      userName,
      userToken,
      token,
    };
  } catch (error) {
    return {
      message:
        error?.response?.data?.message ||
        error.response?.data?.errors[0]?.message ||
        "Some error happend in login action",
      status: error?.response?.status,
      statusText: error?.response?.statusText,
    };
  }
};

export const getAllOrders = async () => {
  const query = `
      query getAllOrders($page : Int) {
        getAllOrders(page : $page) {
          message
          orderItems{
            orderAt 
            items {
              _id 
              title
              imageUrl
            }
          }
        }
      }
    `;
  const graphqlQuery = {
    query,
    variables: {
      page: undefined,
    },
  };

  try {
    const { data, status } = await axios.post(URI, graphqlQuery, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
      },
    });
    return {
      message: "order successfull",
      // errors: data.errors,
      data: data.data,
      status,
    };
  } catch (error) {
    return {
      message:
        error.response.data.message ||
        error?.response.data.errors.reduce((acc, curr) => {
          return (acc += curr.message);
        }, " "),
      status: error.response.status,
    };
  }
};

export const getSignUp = async (formData) => {
  const query = `
    mutation postSignup($input : postSignupForm!){
      postSignup(input : $input) {
        message
      }
    }
  `;
  const graphqlQuery = {
    query,
    variables: {
      input: formData,
    },
  };
  try {
    const response = await axios.post(URI, graphqlQuery);
    // console.log("RESPONSE FROM LOGIN ", response?.data);
    // await new Promise((res) => setTimeout(res, 1000));
    const { data } = response.data;
    return {
      message: data.postSignup.message,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    return {
      message:
        error?.response?.data?.errors[0].message ||
        error.response?.data?.message ||
        error?.message,
      status: error?.response?.status || 400,
      statusText: error?.response?.statusText || "",
    };
  }
};

export const getAllProducts = async (pageNo) => {
  const query = `
      query postProducts($page : Int){
        postProducts(page : $page) {
          products {
            _id
            title
            price
            imageUrl
            description
          }
          totalPages
        }
      }
    `;
  const graphqlQuery = {
    query,
    variables: {
      page: +pageNo,
    },
  };
  try {
    const response = await axios.post(URI, graphqlQuery, {
      headers: {
        Authorization: "Bearer" + localStorage.getItem("JWT:TOKEN"),
      },
    });
    const { data } = response.data;
    const { products, totalPages } = data.postProducts;
    return { message: response.status, statusCode: 200, products, totalPages };
  } catch (error) {
    // console.log("Axios error", error);
    // //this condition is only for checking is the jwt token got expired or not
    // if (error?.response?.data?.errors[0].message === "User not Authorized") {
    //   console.log("isnide axios error");
    //   throw json(error.response.data.message, {
    //     status: error.response.status,
    //     statusText: error.response.statusText,
    //   });
    // }
    // return { message: error?.response?.data?.errors[0].message };
    console.log("error in query", error);
    return {
      message:
        error?.response.data.message ||
        error?.response.data?.errors[0].message ||
        error?.message,
      statusCode:
        error.response.data.errors[0].statusCode ||
        error.response.status ||
        400,
      products: [],
      totalPages: [],
    };
  }
};
