import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const AuthSchema = new mongoose.Schema(
  {
    username: String,
    token: String,
  },
  { collection: "auth" }
);

export default mongoose.model("Auth", AuthSchema);
