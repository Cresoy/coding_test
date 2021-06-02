import { refreshSession } from "../api/auth";

/**
 * Checks if the user is still authenticated during api call
 * and redirects to login if not
 * @param response
 */
const authMiddleware = async (response) => {
  const clear = () => {
    sessionStorage.clear();
    window.location = "/login";
    alert("Session expired! Login again.");
  };
  if (response.status === 401 && response.config.url !== "auth/token") {
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
