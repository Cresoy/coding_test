import mongoose from "mongoose";

mongoose.Promise = global.Promise;

/**
 * Define schema for User collection
 * @type {module:mongoose.Schema<Document, Model<any, any, any>, undefined>}
 */
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "user" }
);

export default mongoose.model("User", UserSchema);
