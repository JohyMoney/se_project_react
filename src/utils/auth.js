import { checkResponse } from "./api.js";

const baseUrl = "http://localhost:3001";

const request = (path, options = {}) => {
  return fetch(`${baseUrl}${path}`, options).then(checkResponse);
};

const unwrap = (payload) => payload?.data ?? payload;

const signup = ({ name, avatar, email, password }) => {
  return request("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(unwrap);
};

const signin = ({ email, password }) => {
  return request("/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(unwrap);
};

const checkToken = (token) => {
  return request("/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(unwrap);
};

export { signup, signin, checkToken };
