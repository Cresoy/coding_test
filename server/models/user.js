import mongoose from "mongoose";

mongoose.Promise = global.Promise;

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
