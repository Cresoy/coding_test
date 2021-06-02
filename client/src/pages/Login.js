import { useState } from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useHistory } from "react-router-dom";
import { login } from "../api/auth";

export default function Login() {
  const styles = style();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPass, setShowPass] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleShowPass = () => setShowPass((showPass) => !showPass);

  const onLogin = async () => {
    setError(null);
    setLoading(true);

    const response = await login({ username, password });
    setLoading(false);
    if (response.ok) {
      // save info to session storage
      sessionStorage.setItem("user", response.data.user);
      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);

      // redirect to homepage
      history.replace("/");
    } else if (response.data?.error) {
      setError(response.data.error);
    } else {
      setError("Failed to login. Please try again.");
    }
  };

  const onEnter = (e) => {
    if (e.key === "Enter") onLogin();
  };

  return (
    <div className={styles.root}>
      <Typography variant={"h4"} className={styles.title}>
        Login
      </Typography>
      {error && <Typography color={"error"}>{error}</Typography>}
      <TextField
        placeholder={"Username"}
        className={styles.input}
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        onKeyDown={onEnter}
      />
      <FormControl className={clsx(styles.input)}>
        <InputLabel>Password</InputLabel>
        <Input
          type={showPass ? "text" : "password"}
          value={password}
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={onEnter}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleShowPass}
              >
                {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      {loading ? (
        <CircularProgress size={30} className={styles.registerButton} />
      ) : (
        <Button
          onClick={onLogin}
          color={"primary"}
          variant={"contained"}
          className={styles.registerButton}
        >
          Login
        </Button>
      )}
      <Typography>
        Not registered yet?{" "}
        <Link href={"/register"} className={styles.link}>
          Create an account
        </Link>
      </Typography>
    </div>
  );
}

const style = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: theme.spacing(5),
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },

  input: {
    width: 240,
    margin: theme.spacing(1),
  },
  registerButton: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
  link: {
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
}));
