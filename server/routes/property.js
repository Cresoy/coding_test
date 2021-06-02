import {
  createProperty,
  getAllProperties,
  getRental,
  getRentalIncome,
} from "../controllers/property";
import { authenticateJWT } from "../middleware/auth";

export default function (router) {
  router.get("/property", authenticateJWT, getAllProperties);
  router.get("/property/rental/income", authenticateJWT, getRentalIncome);
  router.get("/property/rental", authenticateJWT, getRental);
  router.post("/propertyData", authenticateJWT, createProperty);
}
