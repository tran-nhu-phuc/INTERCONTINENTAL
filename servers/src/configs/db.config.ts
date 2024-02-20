import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(
  String(process.env.NAME_DATABASE),
  String(process.env.USER),
  process.env.PASS_WORD_DATABASE,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);
export default sequelize;
