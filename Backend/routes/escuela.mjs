import express from "express";
import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;
const router = express.Router();
dotenv.config();

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
    const result = await client.query("SELECT * FROM escuela");
    res.send(result.rows);
  } finally {
    client.release();
  }
});

router.get("/:codescuela", async (req, res) => {
  const client = await pool.connect();
  const codescuela = req.params.codescuela;

  try {
    const query = {
      text: "SELECT * FROM escuela WHERE codescuela = $1",
      values: [codescuela],
    };
    const result = await client.query(query);
    res.send(result.rows);
  } catch (error) {
    res.status(400).json({ message: "No se encuentra la escuela solicitada" });
  } finally {
    client.release();
  }
});

router.post("/", async (req, res) => {
  const client = await pool.connect();
  const codescuela = req.body.codescuela;
  const nombreesc = req.body.nombreesc;
  const fechacreacion = req.body.fechacreacion;
  try {
    const query = {
      text: "INSERT INTO escuela (codescuela, nombreesc, fechacreacion) VALUES ($1, $2, $3)",
      values: [codescuela, nombreesc, fechacreacion],
    };
    await client.query(query);
    res.send("Nueva escuela creada en la base de datos");
  } catch (error) {
    switch (error.code) {
      case "23505":
        return res
          .status(400)
          .json({ message: "El código de escuela ya existe o es incorrecto" });
      case "23502":
        return res
          .status(400)
          .json({ message: "Faltó rellenar uno de los campos obligatorios" });
      default:
        return res
          .status(400)
          .json({ message: "Ocurrió un error en el servidor" });
    }
  } finally {
    client.release();
  }
});

router.put("/:codescuela", async (req, res) => {
  const client = await pool.connect();
  const codescuela = req.params.codescuela;
  const nombreesc = req.body.nombreesc;
  const fechacreacion = req.body.fechacreacion;
  try {
    const query = {
      text: `UPDATE escuela SET nombreesc = $1, fechacreacion = $2 WHERE codescuela = $3`,
      values: [nombreesc, fechacreacion, codescuela],
    };
    await client.query(query);
    res.send("El escuela ha sido actualizado con exito");
  } catch (error) {
    res.status(400).send("Error al actualizar la escuela");
  } finally {
    client.release();
  }
});

router.delete("/:codescuela", async (req, res) => {
  const client = await pool.connect();
  const codescuela = req.params.codescuela;

  try {
    const query = {
      text: "DELETE FROM escuela WHERE codescuela = $1",
      values: [codescuela],
    };
    await client.query(query);
    res.send(`La escuela ${codescuela} fué eliminada con éxito`);
  } catch (error) {
    res.status(400).send("Error al intentar eliminar una escuela");
  } finally {
    client.release();
  }
});

export default router;
