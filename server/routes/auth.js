import { refreshToken } from "../controllers/auth";

export default function (router) {
  router.post("/auth/token", refreshToken);
}
