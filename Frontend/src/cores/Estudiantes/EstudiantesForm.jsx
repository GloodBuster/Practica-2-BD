import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./styles/estudiantesForm.css";

function EstudiantesForm() {
  return (
    <div className="EstudiantesFormContainer">
      <header className="EstudiantesHeader">
        <Link to="/estudiantes">
          <IoArrowBackOutline size="3rem" />
        </Link>
      </header>
      <form className="EstudiantesForm">
        <h1>Estudiantes</h1>
        <label>
            Cedula
          <input type="text" required />
        </label>
        <label>
            Nombre
          <input type="text" required />
        </label>
        <label>
            Codigo de escuela
          <input type="text" required />
        </label>
        <label>
            Direccion
          <input type="text" required />
        </label>
        <label>
            Telefono
          <input type="text" />
        </label>
        <label>
            Fecha de nacimiento
          <input type="text" required />
        </label>
        <label>
            Estatus
          <input type="text" required />
        </label>
        <button type="submit">Crear Estudiante</button>
      </form>
    </div>
  );
}

export default EstudiantesForm;
