import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NAME_MAIL,
    pass: process.env.PASS_WORD_EMAIL,
  },
});
export default transporter;
