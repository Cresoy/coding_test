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
import { useEffect, useState } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { register } from "../api/auth";
import { useHistory } from "react-router-dom";
import redirectIfAuthenticated from "../middleware/pages";

export default function Register() {
  useEffect(() => {
    redirectIfAuthenticated();
  });

  const styles = style();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPass, setShowPass] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleShowPass = () => setShowPass((showPass) => !showPass);

  const onRegister = async () => {
    setError(null);
    setLoading(true);

    const response = await register({ username, password });
    setLoading(false);
    if (response.ok) {
      // redirects to login
      history.replace("/login");
      alert("Successfully registered. Login now");
    } else if (response.data?.error) {
      setError(response.data.error);
    } else {
      setError("Failed to register. Please try again.");
    }
  };

  const onEnter = (e) => {
    if (e.key === "Enter") onRegister();
  };

  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <Typography variant={"h4"} className={styles.title}>
          Register
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={onEnter}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPass}>
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
            onClick={onRegister}
            color={"primary"}
            variant={"contained"}
            className={styles.registerButton}
          >
            Register
          </Button>
        )}
      </div>

      <Typography>
        Already registered?{" "}
        <Link href={"/login"} className={styles.link}>
          Login
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
    backgroundColor: theme.palette.grey["200"],
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    backgroundColor: "white",
  },
  title: {
    marginTop: theme.spacing(3),
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
