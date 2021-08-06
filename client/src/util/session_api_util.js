import axios from "axios";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const signup = (userData) => {
  return axios.post("/api/user/signup", userData);
};

export const login = (userData) => {
  return axios.post("/api/user/login", userData);
};
