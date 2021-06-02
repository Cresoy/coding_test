import { api } from "./index";

/**
 * Submit registration to api
 * @param username
 * @param password
 * @returns {Promise<ApiErrorResponse<unknown>|ApiOkResponse<unknown>>}
 */
export const register = async ({ username, password }) => {
  const form = new FormData();
  form.append("username", username);
  form.append("password", password);
  const response = await api.post("user/register", form);
  console.log("REGISTER", response);
  return response;
};

/**
 * Login users to the API
 * @param username
 * @param password
 * @returns {Promise<ApiErrorResponse<unknown>|ApiOkResponse<unknown>>}
 */
export const login = async ({ username, password }) => {
  const form = new FormData();
  form.append("username", username);
  form.append("password", password);
  const response = await api.post("user/login", form);
  console.log("LOGIN", response);
  return response;
};

/**
 * Logout user from the API
 * @returns {Promise<void>}
 */
export const logout = async () => {
  const user = await sessionStorage.getItem("user");
  const token = await sessionStorage.getItem("refreshToken");
  const form = new FormData();
  form.append("user", user);
  form.append("token", token);
  const response = await api.post("user/logout", form);
  console.log("LOGOUT", response);
  await sessionStorage.clear();
  window.location = "/login";
};

/**
 * Refreshes access token
 * @returns {Promise<void>}
 */
export const refreshSession = async () => {
  const user = await sessionStorage.getItem("user");
  const token = await sessionStorage.getItem("refreshToken");
  const form = new FormData();
  form.append("user", user);
  form.append("token", token);
  const response = await api.post("auth/token", form);
  console.log("REFRESH SESSION", response);
  return response;
};
