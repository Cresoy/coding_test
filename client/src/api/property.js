import { api, getAPIConfig } from "./index";

export const getAllProperties = async () => {
  const response = await api.get("property", null, await getAPIConfig());
  console.log("GET PROPERTY DATA", response);
  return response;
};

export const getRentalByPropertyId = async (propertyId) => {
  const response = await api.get(
    "property/rental",
    { propertyId },
    await getAPIConfig()
  );
  console.log("GET PROPERTY RENTAL", response);
  return response;
};
