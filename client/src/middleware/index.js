/**
 * Checks if the user is still authenticated during api call
 * and redirects to login if not
 * @param response
 */
import { refreshSession } from "../api/auth";

const authMiddleware = async (response) => {
  const clear = () => {
    sessionStorage.clear();
    window.location = "/login";
    alert("Session expired! Login again.");
  };
  console.log(response);
  if (response.status === 401) {
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (refreshToken) {
      // try to renew accessToken
      const response = await refreshSession();
      if (response.ok) {
        // renew access token in the session storage
        await sessionStorage.setItem("accessToken", response.data.accessToken);
        // reload
        window.location.reload();
      } else clear();
    } else clear();
  }
};

export default function middleware(api) {
  api.addMonitor(authMiddleware);
}
