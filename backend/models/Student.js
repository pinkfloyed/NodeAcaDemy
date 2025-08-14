import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  address: String,
  emailaddress: String,
  mobile: String,
});

export default mongoose.model("Student", studentSchema);
