import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const PropertyDataSchema = new mongoose.Schema(
  {
    propertyId: {
      type: Number,
      required: true,
    },
    propertyName: {
      type: String,
      required: true,
    },
    income: {
      January: Number,
      February: Number,
      March: Number,
      April: Number,
      May: Number,
      June: Number,
      July: Number,
      August: Number,
      September: Number,
      October: Number,
      November: Number,
      December: Number,
    },
    expense: {
      January: Number,
      February: Number,
      March: Number,
      April: Number,
      May: Number,
      June: Number,
      July: Number,
      August: Number,
      September: Number,
      October: Number,
      November: Number,
      December: Number,
    },
  },
  { collection: "propertyData" }
);

export default mongoose.model("PropertyData", PropertyDataSchema);
