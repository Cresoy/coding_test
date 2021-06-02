import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Chart from "../components/Chart";
import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getAllProperties, getRentalByPropertyId } from "../api/property";
import { logout } from "../api/auth";

export default function Home() {
  const username = sessionStorage.getItem("user") || "";

  const styles = style();

  const [propertyId, setPropertyId] = useState(0);
  const [properties, setProperties] = useState([]);
  const [rental, setRental] = useState({});

  const handleChange = async (event) => {
    const id = event.target.value;

    // get data for first property
    const rental = await getRentalByPropertyId(id);

    // save to states
    setRental(rental.data);
    setPropertyId(id);
  };

  const fetchInit = async () => {
    // get all properties
    const properties = await getAllProperties();
    const initPropertyId = properties.data[0]?.propertyId;
    if (!initPropertyId) return;

    // get data for first property
    const rental = await getRentalByPropertyId(initPropertyId);

    // save to states
    setPropertyId(initPropertyId);
    setProperties(properties.data);
    setRental(rental.data);
  };

  useEffect(() => {
    // redirects to login if no accessToken
    if (sessionStorage.getItem("accessToken"))
      (async () => {
        await fetchInit();
      })();
    else window.location = "/login";
  }, []);

  return (
    <>
      <Container fixed className={styles.header}>
        <div>
          <Typography>Hello,</Typography>
          <Typography color={"primary"} variant={"h4"}>
            {username}
          </Typography>
        </div>
        <div>
          <Button onClick={logout}>Logout</Button>
        </div>
      </Container>
      <Container fixed className={styles.root}>
        <FormControl className={styles.select}>
          <InputLabel>Property</InputLabel>
          <Select label={"Property"} value={propertyId} onChange={handleChange}>
            {properties?.map((item) => (
              <MenuItem key={item.propertyId} value={item.propertyId}>
                {item.propertyName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Chart data={rental} />
      </Container>
    </>
  );
}

const style = makeStyles((theme) => ({
  header: {
    paddingTop: 36,
    height: 100,
    display: "flex",
    justifyContent: "space-between",
  },
  root: {
    height: "calc(100vh - 100px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  select: {
    width: 300,
    marginBottom: theme.spacing(3),
  },
}));
