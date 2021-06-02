import mongoose from "mongoose";

mongoose.Promise = global.Promise;

/**
 * Define schema for Auth collection
 * @type {module:mongoose.Schema<Document, Model<any, any, any>, undefined>}
 */
const AuthSchema = new mongoose.Schema(
  {
    username: String,
    token: String,
  },
  { collection: "auth" }
);

export default mongoose.model("Auth", AuthSchema);
