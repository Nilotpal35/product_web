import axios from "axios";
export const URI = process.env.REACT_APP_BACKEND_URI + "graphql";

export const loginAction = async ({ email, password }) => {
  console.log("INSIDE LOGIN ACTION MUTATION", email, password);
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
    console.log("response data", response?.data?.data?.postLogin);
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
