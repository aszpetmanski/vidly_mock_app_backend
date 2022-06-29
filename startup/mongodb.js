import mongoose from "mongoose";
import config from "config";

export function mongodb (){const mongoDB = mongoose
  .connect(config.get('db'))
  .then(() => console.log(`Conectted to... ${config.get('db')}`))
  .catch(() => console.log("Failed to connect."));
}
