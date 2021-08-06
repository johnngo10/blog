import * as APIUtil from "../util/session_api_util";
import jwt_decode from "jwt-decode";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";

// Dispatches when user signs in
export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

// Redirect user to the login page upon signup
export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN,
});

// Dispatches to show authentication errors on the frontend
export const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

// When user is logged out, dispatches to set isAuthenticated to falses
export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

// Upon signup, dispatch the appropriate action
export const signup = (user) => (dispatch) =>
  APIUtil.signup(user).then(
    () => dispatch(receiveUserSignIn()),
    (err) => dispatch(receiveErrors(err.response.data))
  );

// Upon login, set session token and dispatch current user
export const login = (user) => (dispatch) =>
  APIUtil.login(user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decoded(token);
      dispatch(receiveCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch(receiveErrors(err.response.data));
    });

export const logout = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove the token from the common axios header
  APIUtil.setAuthToken(false);
  // Dispatch a logout function
  dispatch(logoutUser());
};
