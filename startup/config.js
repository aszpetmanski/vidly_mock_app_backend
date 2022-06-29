import config from "config";

export function configing() {
    if (!config.get("jwtPrivateKey")) {
        console.error("FATAL ERROR: JWT NOT DEFINED");
        process.exit(1);
      }
}