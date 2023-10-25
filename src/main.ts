import server from "./adapter/driver/express/server";
import { connect } from "mongoose";
const mongoUrl = process.env.MONGO_URI || "";

(async () => {
  await connect(mongoUrl);
  server();
})();
