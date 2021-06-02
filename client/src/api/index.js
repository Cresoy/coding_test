import { create } from "apisauce";
import env from "react-dotenv";

export const api = create({
  baseURL: env.API_URL,
  headers: {
    "content-type": "application/x-www-form-urlencoded",
  },
});

export const getAPIConfig = async () => {
  const token = await sessionStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: "Token " + token,
    },
  };
};

const authMiddleware = (response) => {
  if (response.status === 401) {
    sessionStorage.clear();
    window.location = "/login";
    alert("Session expired. Login again.");
  }
};

api.addMonitor(authMiddleware);
