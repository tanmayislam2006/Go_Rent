import app from "./app";
import config from "./config";

app.listen(config.port, () => {
  console.log(`GO RENT Server Ruining http://localhost:${config.port}`);
});
