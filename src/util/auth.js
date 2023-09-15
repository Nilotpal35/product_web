import { json, redirect } from "react-router-dom";

export function validateExpiration() {
  const expiration = localStorage.getItem("expiration");
  if (!expiration) {
    return null;
  }
  if (Date.now() < expiration) {
    return true;
  } else {
    return false;
  }
}

export function getAuthToken() {
  const token = localStorage.getItem("JWT:TOKEN");

  if (!token) {
    return null;
  }
  if (validateExpiration()) {
    return token;
  }
  return null;
}

export function decodeTokenLoader() {
  const authToken = getAuthToken();
  if (!authToken) {
    return redirect("/login");
  }
  try {
    const decodedToken = JSON.parse(atob(authToken.split(".")[1]));
    console.log("DECODED TOKEN", decodedToken);
    return decodedToken;
  } catch (error) {
    console.log("error in jwt", error);
  }
  return null;
}
