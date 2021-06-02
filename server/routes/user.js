import { login, logout, register } from "../controllers/user";

export default function (router) {
  router.post("/user/register", register);
  router.post("/user/login", login);
  router.post("/user/logout", logout);
}
