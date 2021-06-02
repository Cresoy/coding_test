import { api } from "./index";

export const register = async ({ username, password }) => {
  const form = new FormData();
  form.append("username", username);
  form.append("password", password);
  const response = await api.post("user/register", form);
  console.log("REGISTER", response);
  return response;
};

export const login = async ({ username, password }) => {
  const form = new FormData();
  form.append("username", username);
  form.append("password", password);
  const response = await api.post("user/login", form);
  console.log("LOGIN", response);
  return response;
};

export const logout = async () => {
  const token = await sessionStorage.getItem("refreshToken");
  const form = new FormData();
  form.append("token", token);
  const response = await api.post("user/logout", form);
  console.log("LOGOUT", response);
  await sessionStorage.clear();
  window.location = "/login";
};
