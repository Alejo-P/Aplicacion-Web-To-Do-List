import app from "./server.js";
import { conectar } from "./database.js";
import dotenv from "dotenv";
dotenv.config()

conectar();
app.set('port', process.env.PORT || 3000)
app.listen(app.get("port"), () => {
  console.log(`Servidor ejecutandose en http://localhost:${app.get("port")}`);
});