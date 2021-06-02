import { Route, Switch } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";

export default function RootRoute() {
  return (
    <Switch>
      <Route path={"/register"} component={Register} />
      <Route path={"/login"} component={Login} />
      <Route path={"/"} component={Home} />
    </Switch>
  );
}
