import "dotenv/config";
import server from "./infra/http/server";
import { connect } from "mongoose";
const mongoUrl = process.env.MONGO_URI || "";

(async () => {
  await connect(mongoUrl);
  server();
})();
