/**
 * Redirects to home if user is authenticated
 */
export default function redirectIfAuthenticated() {
  const token = sessionStorage.getItem("accessToken");
  if (token) window.location = "/";
}
