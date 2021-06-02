import { api, getAPIConfig } from "./index";

/**
 * Get all properties from API
 * @returns {Promise<*>}
 */
export const getAllProperties = async () => {
  const response = await api.get("property", null, await getAPIConfig());
  console.log("GET PROPERTY DATA", response);
  return response;
};

/**
 * Get rental details of a property thru propertyId from the API
 * @param propertyId
 * @returns {Promise<*>}
 */
export const getRentalByPropertyId = async (propertyId) => {
  const response = await api.get(
    "property/rental",
    { propertyId },
    await getAPIConfig()
  );
  console.log("GET PROPERTY RENTAL", response);
  return response;
};
