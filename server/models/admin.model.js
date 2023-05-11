const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    // ...baseUserSchema.obj,
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["customer", "seller", "admin"],
      default: "admin",
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false, // set the default value to false
    },
  },
  {
    timestamps: true,
  }
);
//encrypt password
adminSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt();
  console.log(this.password);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.statics.login = async function (emailOrUsername, password) {
  const user = await this.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  });
  if (!user) throw new Error("Incorrect login or password");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log(password, " ...  ", user.password);
  if (!isPasswordValid) throw new Error("Incorrect login or password");

  return user;
};

module.exports = mongoose.model("admins", adminSchema);
