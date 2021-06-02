import "./App.css";
import RootRoute from "./routes/RootRoute";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <RootRoute />
    </Router>
  );
}
