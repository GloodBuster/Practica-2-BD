import React, { useState } from "react";
import axios from "axios";
import "./styles/escuelasForm.css";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

function EscuelasForm() {
  const navigate = useNavigate();
  const [escuela, setEscuela] = useState({
    codescuela: "",
    nombreesc: "",
    fechacreacion: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(escuela);
      const response = await axios.post(
        "http://localhost:3000/escuelas",
        escuela
      );
      console.log(response.data);
      navigate("/escuelas");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setEscuela({ ...escuela, [event.target.name]: event.target.value });
  };

  return (
    <div className="EscuelasFormContainer">
      <header className="EscuelasFormHeader">
        <Link to="/escuelas">
          <IoArrowBackOutline size="3rem" />
        </Link>
      </header>
      <form className="EscuelasForm" onSubmit={handleSubmit}>
        <h1>Escuela</h1>
        <label>
          <h2>Codigo de escuela</h2>
          <input
            type="text"
            name="codescuela"
            required
            placeholder="COD"
            value={escuela.codescuela}
            onChange={handleChange}
          />
        </label>
        <label>
          <h2>Nombre de escuela</h2>
          <input
            type="text"
            name="nombreesc"
            required
            placeholder="Nombre"
            value={escuela.nombreesc}
            onChange={handleChange}
          />
        </label>
        <label>
          <h2>Fecha de creacion de la escuela</h2>
          <input
            type="text"
            name="fechacreacion"
            required
            placeholder="YYYY-MM-DD"
            value={escuela.fechacreacion}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Crear Escuela</button>
      </form>
    </div>
  );
}

export default EscuelasForm;
