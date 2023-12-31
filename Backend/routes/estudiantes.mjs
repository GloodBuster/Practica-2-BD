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

router.get("/:id", async (req, res) => {
  const client = await pool.connect();
  const id = req.params.id;
  const query = {
    text: "SELECT * FROM estudiantes WHERE idestudiante = $1",
    values: [id],
  };
  try {
    const result = await client.query(query);
    res.send(result.rows);
  } catch (error) {
    res
      .status(400)
      .json({ message: "No existe un estudiante con dicho id" });
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

router.put("/:idestudiante", async (req, res) => {
  const client = await pool.connect();
  const id = req.params.idestudiante;
  const cedula = req.body.cedula;
  const nombreest = req.body.nombreest;
  const direccionest = req.body.direccionest;
  const telefonoest = req.body.telefonoest;
  const fechanac = req.body.fechanac;
  const statusest = req.body.statusest;
  const codescuela = req.body.codescuela;

  try {
    const query = {
      text: "UPDATE estudiantes SET nombreest = $1, direccionest = $2, telefonoest = $3, fechanac = $4, statusest = $5, codescuela = $6, cedula = $7 WHERE idestudiante = $8",
      values: [
        nombreest,
        direccionest,
        telefonoest,
        fechanac,
        statusest,
        codescuela,
        cedula,
        id,
      ],
    };
    await client.query(query);
    res.send(`El estudiante con el id ${id} ha sido modificado`);
  } catch (error) {
    res.send("No se pudo modificar el estudiante en la base de datos");
  } finally {
    client.release();
  }
});

router.delete("/:idestudiante", async (req, res) => {
  const client = await pool.connect();
  const id = req.params.idestudiante;

  try {
    const query = {
      text: "DELETE FROM estudiantes WHERE idestudiante = $1",
      values: [id],
    };
    await client.query(query);
    res.send(`Se ha eliminado el usuario con el id ${id}`);
  } catch (error) {
    res.send(`No existe el estudiante con el id ${id}`);
  } finally {
    client.release();
  }
});

export default router;
