import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import "./styles/estudiantesForm.css";
import { useState } from "react";
import axios from "axios";

function EstudiantesForm() {
  const navigate = useNavigate();
  const [estudiante, setEstudiante] = useState({
    cedula: "",
    nombreest: "",
    direccionest: "",
    telefonoest: "",
    fechanac: "",
    statusest: "",
    codescuela: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/estudiantes",
        estudiante
      );
      console.log(response);
      navigate("/estudiantes");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setEstudiante({ ...estudiante, [event.target.name]: event.target.value });
  };

  return (
    <div className="EstudiantesFormContainer">
      <header className="EstudiantesHeader">
        <Link to="/estudiantes">
          <IoArrowBackOutline size="3rem" />
        </Link>
      </header>
      <form className="EstudiantesForm" onSubmit={handleSubmit}>
        <h1>Estudiantes</h1>
        <label>
          Cedula
          <input
            type="text"
            name="cedula"
            required
            placeholder="11111111"
            value={estudiante.cedula}
            onChange={handleChange}
          />
        </label>
        <label>
          Nombre
          <input
            type="text"
            name="nombreest"
            required
            placeholder="Nombre"
            value={estudiante.nombreest}
            onChange={handleChange}
          />
        </label>
        <label>
          Codigo de escuela
          <input
            type="text"
            name="codescuela"
            required
            placeholder="COD"
            value={estudiante.codescuela}
            onChange={handleChange}
          />
        </label>
        <label>
          Direccion
          <input
            type="text"
            name="direccionest"
            required
            placeholder="Direccion"
            value={estudiante.direccionest}
            onChange={handleChange}
          />
        </label>
        <label>
          Telefono
          <input
            type="text"
            name="telefonoest"
            placeholder="04XXXXXXXXX"
            value={estudiante.telefonoest}
            onChange={handleChange}
          />
        </label>
        <label>
          Fecha de nacimiento
          <input
            type="text"
            name="fechanac"
            required
            placeholder="YYYY-MM-DD"
            value={estudiante.fechanac}
            onChange={handleChange}
          />
        </label>
        <label>
          Estatus
          <input
            type="text"
            name="statusest"
            required
            placeholder="XXXXXXX"
            value={estudiante.statusest}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Crear Estudiante</button>
      </form>
    </div>
  );
}

export default EstudiantesForm;
