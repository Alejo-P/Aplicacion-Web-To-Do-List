import app from "./server.js";
import conectar from "./database.js";

conectar();
app.listen(app.get("port"), () => {
  console.log(`Servidor ejecutandose en http://localhost:${app.get("port")}`);
});