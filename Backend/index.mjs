import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routeEscuela from "./routes/escuela.mjs";
import routeEstudiantes from "./routes/estudiantes.mjs";
import cors from "cors";

const { Pool } = pkg;
dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  next();
});
app.use(cors());
app.use;
app.use("/escuelas", routeEscuela);
app.use("/estudiantes", routeEstudiantes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
