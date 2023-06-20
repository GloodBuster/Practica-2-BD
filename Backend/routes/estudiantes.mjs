import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const { Pool } = pkg;
const router = express.Router();
dotenv.config();

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

router.get("/", async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM estudiantes");
    res.send(result.rows);
  } finally {
    client.release();
  }
});

router.get("/:cedula", async (req, res) => {
  const client = await pool.connect();
  const cedula = req.params.cedula;
  const query = {
    text: "SELECT * FROM estudiantes WHERE cedula = $1",
    values: [cedula],
  };
  try {
    const result = await client.query(query);
    res.send(result.rows);
  } catch (error) {
    res
      .status(400)
      .json({ message: "No existe un estudiante con dicha cédula" });
  } finally {
    client.release();
  }
});

router.post("/", async (req, res) => {
  const client = await pool.connect();
  const cedula = req.body.cedula;
  const nombreest = req.body.nombreest;
  const direccionest = req.body.direccionest;
  const telefonoest = req.body.telefonoest;
  const fechanac = req.body.fechanac;
  const statusest = req.body.statusest;
  const codescuela = req.body.codescuela;
  console.log({
    cedula: cedula,
    nombre: nombreest,
    direccion: direccionest,
    telefono: telefonoest,
    fechaNacimiento: fechanac,
    Estatus: statusest,
    Codigo: codescuela,
  });
  try {
    const query = {
      text: "INSERT INTO estudiantes (cedula, nombreest, direccionest, telefonoest, fechanac, statusest, codescuela) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      values: [
        cedula,
        nombreest,
        direccionest,
        telefonoest,
        fechanac,
        statusest,
        codescuela,
      ],
    };
    await client.query(query);
    res.send("Se ha creado un nuevo estudiante en la base de datos");
  } catch (error) {
    res.status(400).send("No se pudo crear el estudiante");
  } finally {
    client.release();
  }
});

router.put("/:cedula", async (req, res) => {
  const client = await pool.connect();
  const cedula = req.params.cedula;
  const nombreest = req.body.nombreest;
  const direccionest = req.body.direccionest;
  const telefonoest = req.body.telefonoest;
  const fechanac = req.body.fechanac;
  const statusest = req.body.statusest;
  const codescuela = req.body.codescuela;

  try {
    const query = {
      text: "UPDATE estudiantes SET nombreest = $1, direccionest = $2, telefonoest = $3, fechanac = $4, statusest = $5, codescuela = $6 WHERE cedula = $7",
      values: [
        nombreest,
        direccionest,
        telefonoest,
        fechanac,
        statusest,
        codescuela,
        cedula,
      ],
    };
    await client.query(query);
    res.send(`El usuario con la cedula ${cedula} ha sido modificado`);
  } catch (error) {
    res.send("No se pudo modificar el estudiante en la base de datos");
  } finally {
    client.release();
  }
});

router.delete("/:cedula", async (req, res) => {
  const client = await pool.connect();
  const cedula = req.params.cedula;

  try {
    const query = {
      text: "DELETE FROM estudiantes WHERE cedula = $1",
      values: [cedula],
    };
    await client.query(query);
    res.send(`Se ha eliminado el usuario con la cedula ${cedula}`);
  } catch (error) {
    res.send(`No existe el estudiante con la cedula ${cedula}`);
  } finally {
    client.release();
  }
});

export default router;
