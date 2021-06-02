import { create } from "apisauce";
import env from "react-dotenv";
import middleware from "../middleware/api";

/**
 * Create API
 * @type {ApisauceInstance}
 */
export const api = create({
  baseURL: env.API_URL,
  headers: {
    "content-type": "application/x-www-form-urlencoded",
  },
});

/**
 * Get API config for api calls
 * @returns {Promise<{headers: {Authorization: string}}>}
 */
export const getAPIConfig = async () => {
  const token = await sessionStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

/**
 * Activate middlewares
 */
middleware(api);
