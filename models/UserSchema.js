import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    id: Number,
    username: String,
    email: String,
    password: String,
    role: String,
    avatar: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    versionKey: false,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
