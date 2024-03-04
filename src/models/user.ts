import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: "string",
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: "string",
    required: [true, "Password is required"],
    select: false,
  },
  fullname: {
    type: "string",
    required: [true, "Fullname is required"],
    minLength: [3, "Fullname must be at least 3 characters"],
    maxLength: [50, "Fullname must be at most 50 characters"],
  },
});

const User = models.User || model("User", userSchema);
export default User;
